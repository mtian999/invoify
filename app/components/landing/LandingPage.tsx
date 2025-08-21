"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next-intl/link";

// Components
import Header from "./Header";

// Icons
import { 
    FileText, 
    Download, 
    Eye, 
    Save, 
    Globe,
    ArrowRight,
    Zap,
    Shield,
    Star,
    ChevronDown,
    ChevronUp,
    Quote
} from "lucide-react";

// ShadCn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
    const t = useTranslations("landing");
    const locale = useLocale();
    
    // 这里不再需要手动控制状态，因为使用了Accordion组件

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

    // 用户评价数据
    const testimonials = [
        {
            quote: t("testimonials.items.0.quote"),
            author: t("testimonials.items.0.author"),
            role: t("testimonials.items.0.role"),
            rating: 5
        },
        {
            quote: t("testimonials.items.1.quote"),
            author: t("testimonials.items.1.author"),
            role: t("testimonials.items.1.role"),
            rating: 5
        },
        {
            quote: t("testimonials.items.2.quote"),
            author: t("testimonials.items.2.author"),
            role: t("testimonials.items.2.role"),
            rating: 4
        },
        {
            quote: t("testimonials.items.3.quote"),
            author: t("testimonials.items.3.author"),
            role: t("testimonials.items.3.role"),
            rating: 5
        }
    ];

    // 常见问题数据
    const faqs = [
        {
            question: t("faq.items.0.question"),
            answer: t("faq.items.0.answer")
        },
        {
            question: t("faq.items.1.question"),
            answer: t("faq.items.1.answer")
        },
        {
            question: t("faq.items.2.question"),
            answer: t("faq.items.2.answer")
        },
        {
            question: t("faq.items.3.question"),
            answer: t("faq.items.3.answer")
        },
        {
            question: t("faq.items.4.question"),
            answer: t("faq.items.4.answer")
        },
        {
            question: t("faq.items.5.question"),
            answer: t("faq.items.5.answer")
        }
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
        <div className="min-h-screen pt-16 md:pt-20">
            <Header />
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
            <section id="features" className="py-20 bg-white dark:bg-slate-800">
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

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t("testimonials.title")}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t("testimonials.subtitle")}
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="mb-4 text-blue-600">
                                        <Quote className="h-8 w-8" />
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                            />
                                        ))}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white dark:bg-slate-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t("faq.title")}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t("faq.subtitle")}
                        </p>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-50 dark:bg-slate-900">
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
