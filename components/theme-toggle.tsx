"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import themeLight from "../public/theme-toggle/theme-light.png";
import themeDark from "../public/theme-toggle/theme-dark.png";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    const isLight = theme === "light";
    const handleToggle = () => {
        setTheme(isLight ? "dark" : "light");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <Button variant="secondary" size="icon">
        <LoaderCircle />
    </Button>;

    return (
        <Button
            size="icon"
            className="size-8 cursor-pointer bg-transparent hover:bg-accent-foreground/10"
            onClick={handleToggle}
            aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
        >
            <Image
                src={isLight ? themeLight : themeDark}
                alt={`Switch to ${isLight ? "dark" : "light"} mode`}
                width={24}
                height={24}
                priority
            />
        </Button>
    );
};

export { ThemeToggle };
