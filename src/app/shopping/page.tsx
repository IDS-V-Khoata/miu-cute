"use client";

import ShoppingLayout from "@/components/layout/ShoppingLayout/ShoppingLayout";
import { useEffect, useState } from "react";
import OverLoad from "@/components/OverLoad";
import Image from "next/image";

interface ListProductProps {
    id: string;
    category: string;
    description: string;
    price: string;
    title: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}

export default function Chats() {
    const [listProduct, setListProduct] = useState<ListProductProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/shopping', {
                    method: 'POST',
                });
                const data = await response.json();
                console.log(data)
                setListProduct(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ShoppingLayout titlePage="Shopping">
            <OverLoad isActive={loading} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 px-4">
                {
                    listProduct.map((product) => {
                        return (
                            <div key={product.id} className="p-4 mb-4 border border-gray-200 rounded shadow hover:shadow-lg transition-shadow">
                                <div className="relative w-full h-64 md:h-60 mb-4">
                                    <Image
                                        src={product.image}
                                        alt={product.description}
                                        layout="fill"
                                        objectFit="scale-down"
                                        onLoadingComplete={() => setLoading(false)}
                                    />
                                </div>
                                <p className="text-lg text-darkgreen font-bold">${product.price}</p>
                                <h2 className="text-xl text-darkgreen font-semibold mb-2">{product.title}</h2>
                                <p className="text-darkcharcoal mb-4">{`${product.description.slice(0, 150)} ...`}</p>
                                <p className="text-sm text-darkgreen">Category: {product.category} | Rate: {product.rating.rate} | Rating Count: {product.rating.count}</p>
                            </div>
                        )
                    })
                }
            </div>
        </ShoppingLayout>
    );
}
