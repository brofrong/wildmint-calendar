import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";
import { TelegramIcon } from "@/components/icons/telegram-icon";
import { Button } from "@/components/ui/button";

const TELEGRAM_URL = "https://t.me/brofrong";
const GITHUB_URL = "https://github.com/brofrong/wildmint-calendar/";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
	return (
		<div className="mx-auto w-full md:max-w-md">
			<header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-4 py-3">
				<Button variant="ghost" size="icon-sm" asChild>
					<Link to="/settings" aria-label="Назад">
						<ChevronLeft />
					</Link>
				</Button>
				<h1 className="text-lg font-semibold">О приложении</h1>
			</header>

			<div className="space-y-8 p-6">
				<div className="space-y-5 text-base leading-relaxed text-muted-foreground">
					<p>
						Неофициальный календарь фестиваля «Дикая Мята». Сайт не связан с
						организаторами и не представляет фестиваль — это просто фановый
						проект от поклонника.
					</p>
					<p>
						Собрали за пару дней, в основном на вайбкоде: хотелось сделать
						удобное расписание и карту, без лишней суеты.
					</p>
					<p>
						Исходный код открыт, а данные о вас никуда не уходят — никакой
						аналитики и аккаунтов, избранное и настройки остаются только в вашем
						браузере.
					</p>
				</div>

				<div className="flex items-center justify-center gap-4">
					<Button variant="outline" size="icon-lg" className="size-12" asChild>
						<a
							href={TELEGRAM_URL}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Telegram @brofrong"
						>
							<TelegramIcon className="size-6" />
						</a>
					</Button>
					<Button variant="outline" size="icon-lg" className="size-12" asChild>
						<a
							href={GITHUB_URL}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub репозиторий"
						>
							<GithubIcon className="size-6" />
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
