"use client"

import { usePathname } from "next/navigation";
import { Users, Home, ListTodo, Signature, LogOut, ChevronDown, Youtube, ChartPie, Archive, CircleCheck, UserRoundPen, UserIcon } from "lucide-react";
import Image from "next/image";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { role } from "@/lib/utils";
import React from "react";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        visible: [1, 2, 3, 4]
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: UserRoundPen,
        visible: [1, 2, 3, 4]
    },
    {
        title: "Licensee",
        url: "/dashboard/licensee",
        icon: Youtube,
        visible: [1, 2, 3, 4]
    },
    {
        title: "Billing",
        url: "/dashboard/billing",
        icon: Users,
        visible: [1, 3, 4]
    },
    {
        title: "Water Tax",
        url: "/dashboard/Watertax",
        icon: Signature,
        visible: [1, 4]
    },
    {
        title: "Reports",
        url: "/dashboard/reports",
        icon: ChartPie,
        visible: [1, 2, 3, 4]
    },
    {
        title: "Logout",
        url: "/logout",
        icon: LogOut,
        visible: [1, 2, 3, 4]
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-2">
                            {/* Logo Section */}
                            <div className="flex items-center justify-center gap-2">
                                <Image src="/kl.png" className="py-2 px-1" width="150" height="150" alt="logo" />
                            </div>

                            {/* User Profile Section */}
                            <Card className="mb-1 bg-transparent bg-white py-1 mt-1">
                                <CardContent className="p-0 flex items-center gap-3 px-4 py-2">
                                    <Image src="/noavatar.png" className="rounded-xl" width="40" height="40" alt="profile" />
                                    <p className="text-muted-foreground">Administrator</p>
                                </CardContent>
                            </Card>

                            {/* Home Section */}
                            {items.map((item, index) => {
                                if (index === 0 && item.visible.includes(role)) {
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className={`text-base gap-2 py-6 px-2 ${pathname === item.url ? "font-bold text-blue-950" : ""
                                                    }`}
                                            >
                                                <Link href={item.url}>
                                                    <item.icon className="w-5 h-5" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }
                                return null;
                            })}
                            {/* Render Remaining Items */}
                            {items.slice(1).map((item) => {
                                if (item.visible.includes(role)) {
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className={`text-base gap-2 py-6 px-2 ${pathname === item.url ? "font-bold text-blue-950" : ""
                                                    }`}
                                            >
                                                <Link href={item.url}>
                                                    <item.icon className="w-5 h-5" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }
                                return null;
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-sm p-4 text-gray-400">&copy; copyright 2025</SidebarFooter>
        </Sidebar>
    );

}
