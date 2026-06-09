"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import MapLayout from "@/components/layout/MapLayout/MapLayout";
import { useEffect, useState } from "react";
import OverLoad from "@/components/OverLoad";
import Image from "next/image";
import Modal from "@/components/Modals";
// import type { Marker as LeafletMarkerComponent } from "react-leaflet";

const MapContainer = dynamic(
    () => import("react-leaflet").then((m) => m.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import("react-leaflet").then((m) => m.TileLayer),
    { ssr: false }
);

// const Marker = dynamic(
//     () => import("react-leaflet").then((m) => m.Marker),
//     { ssr: false }
// ) as typeof LeafletMarkerComponent;

interface CountriesProps {
    name: {
        common: string;
        official: string;
        nativeName?: {
            [key: string]: {
                official: string;
                common: string;
            }
        }
    },
    region: string;
    flags: {
        alt: string;
        png: string;
        svg: string;
    },
    cioc: string;
}

interface CountryDetailProps extends CountriesProps {
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    },
    flags: {
        alt: string;
        png: string;
        svg: string;
    },
    name: {
        common: string;
        official: string;
        nativeName?: {
            [key: string]: {
                official: string;
                common: string;
            }
        }
    },
    latlng: [number, number];
}

export default function Maps() {
    const [listCountries, setListCountries] = useState<CountriesProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState<CountryDetailProps>({} as CountryDetailProps);
    const [isShowCentryDetail, setIsShowCentryDetail] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/maps', {
                    method: 'GET',
                });
                const data = await response.json();
                // console.log(data)
                setListCountries(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const fetchCountry = async (name: string) => {
        try {
            setLoading(true);
            const response = await fetch('/api/maps', {
                method: 'POST',
                body: JSON.stringify({ name: name })
            });
            const data = await response.json();
            console.log("country =================================================>", data)

            setCountries(data);
            setLoading(false);
            setIsShowCentryDetail(true);
        } catch (error) {
            console.error('Error fetching country:', error);
        }
    };

    const handleShowCountriDetail = (name: string) => {
        fetchCountry(name);
    }

    return (
        <MapLayout titlePage="Countries">
            <OverLoad isActive={loading} />
            <div className="max-w-5xl xl:max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                    {
                        listCountries.map((countrie, index) => {
                            return (
                                <div key={index} className="bg-darkcharcoal p-4 mb-4 border border-lightgreen rounded shadow hover:rounded-2xl transition-rounded duration-500 cursor-pointer" onClick={() => handleShowCountriDetail(countrie.name.common)}>
                                    <p className="font-bold text-lightyellow text-lg">{countrie.name.common}</p>
                                    <p className=" text-lightgreen text-sm"><span>(</span>{countrie.name.official}<span>)</span></p>
                                    <div className="relative w-full h-64 md:h-40">
                                        <Image
                                            src={countrie.flags.svg}
                                            alt={countrie.name.official}
                                            fill
                                            loading="lazy"
                                            className="object-scale-down"
                                            onLoad={() => setLoading(false)}
                                        />
                                    </div>
                                    <p className="font-bold text-darkcharcoal text-sm">Region: {countrie.region}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Modal isOpen={isShowCentryDetail} onCloseModal={() => setIsShowCentryDetail(false)} title={""} size="large">
                <div className="mt-2">
                    <div className="flex items-center gap-6 mb-4">
                        <p className="text-lightyellow font-semibold text-lg">{countries?.name?.common}</p>
                        <div className="relative flex w-10 h-10">
                            {countries?.flags?.svg && (
                                <Image
                                    src={countries?.flags?.svg}
                                    alt={countries?.name?.official}
                                    fill
                                    className="object-scale-down"
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full h-[420px]">
                        {countries.latlng && (
                            <MapContainer bounds={[countries.latlng]} style={{ height: 400 }} key={countries.name.common}>
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                />
                                {/* <Marker position={countries.latlng} >
                                    <span>AAA</span>
                                </Marker> */}
                            </MapContainer>
                        )}
                    </div>
                </div>
            </Modal>
        </MapLayout>
    );
}
