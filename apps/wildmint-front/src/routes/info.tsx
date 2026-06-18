import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Heart, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { fetchInfoStats, type InfoStats } from "@/lib/api/info";

export const Route = createFileRoute("/info")({
	component: InfoPage,
});

function formatCount(value: number) {
	return new Intl.NumberFormat("ru-RU").format(value);
}

function InfoPage() {
	const [stats, setStats] = useState<InfoStats | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		fetchInfoStats()
			.then((data) => {
				if (!cancelled) {
					setStats(data);
				}
			})
			.catch((err: unknown) => {
				if (!cancelled) {
					setError(
						err instanceof Error ? err.message : "Не удалось загрузить статистику",
					);
				}
			});

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className="mx-auto w-full pb-24 md:max-w-md">
			<header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-4 py-3">
				<Button variant="ghost" size="icon-sm" asChild>
					<Link to="/settings" aria-label="Назад">
						<ChevronLeft />
					</Link>
				</Button>
				<h1 className="text-lg font-semibold">Статистика</h1>
			</header>

			<div className="space-y-6 p-6">
				<p className="text-base leading-relaxed text-muted-foreground">
					Сводка по пользователям приложения. Считаются только те, кто
					зарегистрировался и синхронизировал избранное с сервером.
				</p>

				{error ? (
					<p className="text-sm text-destructive">{error}</p>
				) : stats ? (
					<div className="grid gap-4">
						<StatCard
							icon={Users}
							value={stats.registeredUsersCount}
							label="Зарегистрировалось"
						/>
						<StatCard
							icon={Heart}
							value={stats.usersWithFavoritesCount}
							label="Лайкнули артистов"
							description={`${formatCount(stats.totalFavoritesCount)} лайков всего`}
						/>
					</div>
				) : (
					<p className="text-sm text-muted-foreground">Загрузка…</p>
				)}
			</div>
		</div>
	);
}

type StatCardProps = {
	icon: typeof Users;
	value: number;
	label: string;
	description?: string;
};

function StatCard({ icon: Icon, value, label, description }: StatCardProps) {
	return (
		<div className="rounded-2xl border border-border/60 bg-card p-6">
			<div className="flex items-start gap-4">
				<div className="rounded-full bg-primary/10 p-3 text-primary">
					<Icon className="size-5" aria-hidden />
				</div>
				<div className="min-w-0 flex-1">
					<div className="text-3xl font-semibold tabular-nums tracking-tight">
						{formatCount(value)}
					</div>
					<div className="mt-1 text-sm font-medium">{label}</div>
					{description ? (
						<div className="mt-1 text-sm text-muted-foreground">
							{description}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
