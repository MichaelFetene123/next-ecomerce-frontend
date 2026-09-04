"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeOption {
  id: 'light' | 'dark' | 'system';
  title: string;
  description: string;
  icon: React.ElementType;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'light',
    title: 'Light Mode',
    description: 'Crisp, high-contrast light interface with bright backgrounds.',
    icon: Sun,
  },
  {
    id: 'dark',
    title: 'Dark Mode',
    description: 'Deep, comfortable dark aesthetic designed to reduce eye strain.',
    icon: Moon,
  },
  {
    id: 'system',
    title: 'System Default',
    description: 'Automatically synchronizes with your device operating system theme.',
    icon: Laptop,
  },
];

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Appearance</h1>
        <p className="text-base text-muted-foreground mt-1">
          Customize how Storefront looks on your device. Choose between light, dark, or system preference.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Interface Theme</CardTitle>
              <CardDescription className="text-base">Select your preferred color mode</CardDescription>
            </div>
            {mounted && (
              <Badge variant="outline" className="capitalize text-base">
                Current: <span className="font-semibold text-primary ml-1">{theme}</span>
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themeOptions.map((opt) => {
              const isSelected = mounted && theme === opt.id;
              const Icon = opt.icon;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  className={cn(
                    "text-left rounded-xl p-4 border-2 transition-all cursor-pointer relative flex flex-col justify-between gap-4 group",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/60 hover:border-border hover:bg-muted/30"
                  )}
                >
                  {/* Visual Preview Graphic */}
                  <div className="w-full h-28 rounded-lg overflow-hidden border border-border/40 flex flex-col">
                    {opt.id === 'light' && (
                      <div className="w-full h-full bg-[#fbf8ff] p-2.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-2.5 rounded-sm bg-[#012169]" />
                          <div className="w-3.5 h-3.5 rounded-full bg-[#012169]/20" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="w-full h-7 rounded bg-white border border-[#c4c5d8]/50 shadow-xs" />
                          <div className="w-2/3 h-2 rounded-xs bg-[#c4c5d8]" />
                        </div>
                      </div>
                    )}

                    {opt.id === 'dark' && (
                      <div className="w-full h-full bg-slate-950 p-2.5 flex flex-col justify-between text-white">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-2.5 rounded-sm bg-blue-500" />
                          <div className="w-3.5 h-3.5 rounded-full bg-slate-800" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="w-full h-7 rounded bg-slate-900 border border-slate-800 shadow-xs" />
                          <div className="w-2/3 h-2 rounded-xs bg-slate-700" />
                        </div>
                      </div>
                    )}

                    {opt.id === 'system' && (
                      <div className="w-full h-full flex">
                        <div className="w-1/2 h-full bg-[#fbf8ff] p-2.5 flex flex-col justify-between border-r border-border/40">
                          <div className="w-8 h-2 rounded-sm bg-[#012169]" />
                          <div className="w-full h-6 rounded bg-white border border-[#c4c5d8]/50" />
                        </div>
                        <div className="w-1/2 h-full bg-slate-950 p-2.5 flex flex-col justify-between">
                          <div className="w-8 h-2 rounded-sm bg-blue-500" />
                          <div className="w-full h-6 rounded bg-slate-900 border border-slate-800" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Details & Selection Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-lg text-foreground">{opt.title}</span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
