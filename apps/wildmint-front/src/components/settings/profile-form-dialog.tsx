import { type ChangeEvent, useRef, useState } from "react";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ProfileFormDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	initialName: string;
	initialAvatar: string | null;
	submitLabel: string;
	isSubmitting?: boolean;
	onSubmit: (data: { name: string; avatar: string | null }) => void;
};

function getInitials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}

export function ProfileFormDialog({
	open,
	onOpenChange,
	title,
	description,
	initialName,
	initialAvatar,
	submitLabel,
	isSubmitting = false,
	onSubmit,
}: ProfileFormDialogProps) {
	const [name, setName] = useState(initialName);
	const [avatar, setAvatar] = useState<string | null>(initialAvatar);
	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleOpenChange(nextOpen: boolean) {
		if (nextOpen) {
			setName(initialName);
			setAvatar(initialAvatar);
		}
		onOpenChange(nextOpen);
	}

	async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			setAvatar(typeof reader.result === "string" ? reader.result : null);
		};
		reader.readAsDataURL(file);
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="flex flex-col items-center gap-3">
						<button
							type="button"
							className="group relative"
							onClick={() => fileInputRef.current?.click()}
						>
							<Avatar size="lg" className="size-20">
								{avatar ? <AvatarImage src={avatar} alt="" /> : null}
								<AvatarFallback className="text-lg">
									{getInitials(name || "?")}
								</AvatarFallback>
							</Avatar>
							<span
								className={cn(
									"absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100",
								)}
							>
								<Camera className="size-5" />
							</span>
						</button>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleFileChange}
						/>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => fileInputRef.current?.click()}
						>
							Загрузить аватар
						</Button>
					</div>

					<div className="space-y-2">
						<Label htmlFor="profile-name">Имя</Label>
						<Input
							id="profile-name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="Ваше имя"
							maxLength={100}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button
						type="button"
						disabled={!name.trim() || isSubmitting}
						onClick={() =>
							onSubmit({ name: name.trim(), avatar })
						}
					>
						{submitLabel}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
