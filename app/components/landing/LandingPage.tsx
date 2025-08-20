"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next-intl/link";

// Icons
import { 
    FileText, 
    Download, 
    Eye, 
    Save, 
    Globe,
    ArrowRight,
    Zap,
    Shield
} from "lucide-react";

// ShadCn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LandingPage = () => {
    const t = useTranslations("landing");
    const locale = useLocale();

    const features = [
        {
            icon: <Shield className="h-8 w-8 text-green-600" />,
            title: t("features.items.free.title"),
            description: t("features.items.free.description"),
        },
        {
            icon: <FileText className="h-8 w-8 text-blue-600" />,
            title: t("features.items.templates.title"),
            description: t("features.items.templates.description"),
        },
        {
            icon: <Download className="h-8 w-8 text-purple-600" />,
            title: t("features.items.export.title"),
            description: t("features.items.export.description"),
        },
        {
            icon: <Eye className="h-8 w-8 text-orange-600" />,
            title: t("features.items.preview.title"),
            description: t("features.items.preview.description"),
        },
        {
            icon: <Save className="h-8 w-8 text-indigo-600" />,
            title: t("features.items.storage.title"),
            description: t("features.items.storage.description"),
        },
        {
            icon: <Globe className="h-8 w-8 text-teal-600" />,
            title: t("features.items.multilingual.title"),
            description: t("features.items.multilingual.description"),
        },
    ];

    const steps = [
        {
            number: "01",
            title: t("howItWorks.steps.step1.title"),
            description: t("howItWorks.steps.step1.description"),
        },
        {
            number: "02",
            title: t("howItWorks.steps.step2.title"),
            description: t("howItWorks.steps.step2.description"),
        },
        {
            number: "03",
            title: t("howItWorks.steps.step3.title"),
            description: t("howItWorks.steps.step3.description"),
        },
        {
            number: "04",
            title: t("howItWorks.steps.step4.title"),
            description: t("howItWorks.steps.step4.description"),
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            <Zap className="h-4 w-4 mr-2" />
                            Free Invoice Generator
                        </Badge>
                        
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            {t("hero.title")}
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            {t("hero.subtitle")}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/invoice">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                                    {t("hero.cta")}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/invoice">
                                <Button variant="outline" className="px-8 py-3 text-lg">
                                    {t("hero.tryDemo")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-slate-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t("features.title")}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t("features.subtitle")}
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t("howItWorks.title")}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t("howItWorks.subtitle")}
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                                        {step.number}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 dark:bg-gray-600 -translate-x-8"></div>
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-blue-600 dark:bg-blue-800">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 text-center text-white">
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold mb-2">100%</div>
                            <div className="text-blue-100">Free Forever</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold mb-2">5+</div>
                            <div className="text-blue-100">Export Formats</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold mb-2">14+</div>
                            <div className="text-blue-100">Languages Supported</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white dark:bg-slate-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t("cta.title")}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            {t("cta.subtitle")}
                        </p>
                        <Link href="/invoice">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                                {t("cta.button")}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
