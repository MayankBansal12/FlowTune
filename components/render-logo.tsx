"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { CircleDot } from "lucide-react";
import { motion } from "motion/react"
import logoLight from "../public/logo/logo-light.png";
import logoDark from "../public/logo/logo-dark.png";

const RenderLogo = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <CircleDot className="w-14 h-14 opacity-0" />;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.2, bounce: 0.3 },
            }}
        >
            <Image
                src={theme === "dark" ? logoDark : logoLight}
                alt="logo"
                className="w-14 h-14"
            />
        </motion.div>
    );
};

export { RenderLogo };