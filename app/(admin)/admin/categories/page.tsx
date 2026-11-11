"use client";

import React from 'react';
import { useCategories } from '@/hooks/use-categories';
import { AdminTableSkeleton } from '@/components/skeletons/admin/admin-table-skeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderTree, Plus, RefreshCw, MoreVertical, Layers } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminCategoriesPage() {
  const { data: categories = [], isLoading, refetch, isFetching } = useCategories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Categories
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Organize catalog hierarchy, parent-child relationships, and navigation slugs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-xs font-medium rounded-xl gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Button
            size="sm"
            className="text-xs font-semibold rounded-xl gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </Button>
        </div>
      </div>

      {/* Categories Content */}
      {isLoading ? (
        <AdminTableSkeleton rows={5} />
      ) : categories.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-border rounded-xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center mx-auto">
            <FolderTree className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-foreground">No categories defined</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Create your first product category to organize your storefront.
          </p>
        </Card>
      ) : (
        <Card className="border-border bg-card shadow-none rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="p-4 pl-6">Category Name</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Hierarchy</th>
                  <th className="p-4">Subcategories</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {categories.map((category) => {
                  const childrenCount = category.children?.length ?? 0;

                  return (
                    <tr key={category.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-semibold text-foreground block">
                              {category.name}
                            </span>
                            {category.description && (
                              <span className="text-[11px] text-muted-foreground line-clamp-1">
                                {category.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-[11px] text-muted-foreground">
                        /{category.slug}
                      </td>

                      <td className="p-4 text-muted-foreground">
                        {category.parent_id ? 'Child Category' : 'Root Category'}
                      </td>

                      <td className="p-4 font-semibold text-foreground">
                        {childrenCount} subcategories
                      </td>

                      <td className="p-4">
                        <Badge
                          variant={category.is_active ? 'secondary' : 'outline'}
                          className="text-[10px] font-bold py-0 h-5"
                        >
                          {category.is_active ? 'Active' : 'Hidden'}
                        </Badge>
                      </td>

                      <td className="p-4 pr-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button variant="ghost" size="icon-sm" className="rounded-lg">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            }
                          />
                          <DropdownMenuContent align="end" className="text-xs">
                            <DropdownMenuItem className="cursor-pointer">
                              Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              Add Subcategory
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
