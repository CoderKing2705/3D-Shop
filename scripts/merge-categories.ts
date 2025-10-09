// scripts/merge-categories.ts

import { prisma } from "@/app/lib/prisma";

async function main() {
    const cats = await prisma.category.findMany();
    const map = new Map<string, { id: number; name: string }>();

    for (const c of cats) {
        const key = c.name.toLowerCase().trim();
        if (!map.has(key)) {
            map.set(key, { id: c.id, name: c.name }); // keep first as canonical
        } else {
            const canonical = map.get(key)!;
            // reassign products from duplicate to canonical
            const products = await prisma.product.findMany({
                where: { categories: { some: { id: c.id } } },
                select: { id: true },
            });

            for (const p of products) {
                // connect canonical, disconnect duplicate
                await prisma.product.update({
                    where: { id: p.id },
                    data: {
                        categories: {
                            connect: { id: canonical.id },
                            disconnect: { id: c.id },
                        },
                    },
                });
            }

            // delete the now-empty duplicate category
            await prisma.category.delete({ where: { id: c.id } });
            console.log(`Merged category "${c.name}" (${c.id}) into "${canonical.name}" (${canonical.id})`);
        }
    }
}

main()
    .then(() => {
        console.log("Merge complete");
        prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
