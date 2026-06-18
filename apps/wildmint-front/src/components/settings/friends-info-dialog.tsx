import { useState } from "react";
import { Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { SettingsRow } from "@/components/settings/settings-row";

export function FriendsInfoDialog() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<SettingsRow
				label={
					<span className="flex items-center gap-2">
						Друзья
						<Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
							beta
						</Badge>
					</span>
				}
			>
				<Button
					type="button"
					variant="ghost"
					size="icon-sm"
					onClick={() => setOpen(true)}
					aria-label="Как добавить друзей"
				>
					<Info className="size-4" />
				</Button>
			</SettingsRow>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							Как добавить друзей
							<Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
								beta
							</Badge>
						</DialogTitle>
						<DialogDescription asChild>
							<div className="space-y-3 pt-1 text-left text-sm text-muted-foreground">
								<p>
									Чтобы добавить друга, поделитесь своим UUID — его можно
									скопировать в профиле после авторизации. Друг должен вставить
									ваш код в поле «Добавить друга по коду» в своих настройках.
								</p>
								<p>
									После этого вы увидите любимые группы друг друга на страницах
									«Календарь» и «Любимые».
								</p>
								<p className="text-amber-600 dark:text-amber-500">
									Функция добавлена в последний день перед фестивалем и мало
									протестирована — возможны баги.
								</p>
							</div>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
