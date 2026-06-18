import { useState } from "react";
import { Copy, LogIn, Pencil } from "lucide-react";

import { ProfileFormDialog } from "@/components/settings/profile-form-dialog";
import { SettingsRow } from "@/components/settings/settings-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	signup,
	updateProfile,
	addFriend,
	removeFriend,
	type FriendProfile,
} from "@/lib/api/auth";
import { syncFavoritesToServer } from "@/lib/sync-favorites";
import { useAuthStore } from "@/stores/auth-store";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useSocialStore } from "@/stores/social-store";
import { FriendsList } from "@/components/settings/friends-list";
import { FriendsInfoDialog } from "@/components/settings/friends-info-dialog";

function getInitials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}

export function AuthSetting() {
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	const friends = useSocialStore((state) => state.friends);
	const addFriendToStore = useSocialStore((state) => state.addFriend);
	const removeFriendFromStore = useSocialStore((state) => state.removeFriend);

	const [authOpen, setAuthOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [friendCode, setFriendCode] = useState("");
	const [friendError, setFriendError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	async function handleSignup(data: { name: string; avatar: string | null }) {
		setIsSubmitting(true);
		try {
			const newUser = await signup(data.name, data.avatar);
			setUser(newUser);
			setAuthOpen(false);

			const favoriteEventIds =
				useFavoritesStore.getState().favoriteEventIds;
			await syncFavoritesToServer(favoriteEventIds);
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handleUpdateProfile(data: {
		name: string;
		avatar: string | null;
	}) {
		setIsSubmitting(true);
		try {
			const updatedUser = await updateProfile(data);
			setUser(updatedUser);
			setEditOpen(false);
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handleAddFriend() {
		const trimmed = friendCode.trim();
		if (!trimmed) {
			return;
		}

		setFriendError(null);
		setIsSubmitting(true);
		try {
			const friend = await addFriend(trimmed);
			addFriendToStore(friend);
			setFriendCode("");
		} catch (error) {
			setFriendError(
				error instanceof Error ? error.message : "Не удалось добавить друга",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handleRemoveFriend(friend: FriendProfile) {
		await removeFriend(friend.id);
		removeFriendFromStore(friend.id);
	}

	async function handleCopyCode() {
		if (!user) {
			return;
		}

		await navigator.clipboard.writeText(user.id);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 2000);
	}

	if (!user) {
		return (
			<>
				<SettingsRow label="Профиль">
					<Button type="button" size="sm" onClick={() => setAuthOpen(true)}>
						<LogIn className="size-4" />
						Авторизоваться
					</Button>
				</SettingsRow>

				<FriendsInfoDialog />

				<ProfileFormDialog
					open={authOpen}
					onOpenChange={setAuthOpen}
					title="Авторизация"
					description="Загрузите аватарку и введите имя, чтобы сохранить любимые группы и делиться ими с друзьями."
					initialName=""
					initialAvatar={null}
					submitLabel="Войти"
					isSubmitting={isSubmitting}
					onSubmit={handleSignup}
				/>
			</>
		);
	}

	return (
		<>
			<div className="px-4 py-3">
				<div className="flex items-center gap-3">
					<Avatar size="lg">
						{user.avatar ? <AvatarImage src={user.avatar} alt="" /> : null}
						<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
					</Avatar>
					<div className="min-w-0 flex-1">
						<div className="font-medium">{user.name}</div>
						<div className="truncate text-xs text-muted-foreground">
							{user.id}
						</div>
					</div>
					<Button
						type="button"
						variant="outline"
						size="icon-sm"
						onClick={() => setEditOpen(true)}
						aria-label="Редактировать профиль"
					>
						<Pencil className="size-4" />
					</Button>
				</div>
			</div>

			<SettingsRow label="Код для друзей">
				<div className="flex max-w-[12rem] items-center gap-2">
					<span className="truncate font-mono text-xs">{user.id}</span>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onClick={handleCopyCode}
						aria-label="Скопировать код"
					>
						<Copy className="size-4" />
					</Button>
					{copied ? (
						<span className="text-xs text-muted-foreground">Скопировано</span>
					) : null}
				</div>
			</SettingsRow>

			<div className="space-y-2 px-4 py-3">
				<div className="text-sm">Добавить друга по коду</div>
				<div className="flex gap-2">
					<Input
						value={friendCode}
						onChange={(event) => setFriendCode(event.target.value)}
						placeholder="UUID друга"
						className="font-mono text-xs"
					/>
					<Button
						type="button"
						size="sm"
						disabled={!friendCode.trim() || isSubmitting}
						onClick={handleAddFriend}
					>
						Добавить
					</Button>
				</div>
				{friendError ? (
					<p className="text-xs text-destructive">{friendError}</p>
				) : null}
			</div>

			<FriendsList
				friends={friends}
				onRemove={handleRemoveFriend}
			/>

			<FriendsInfoDialog />

			<ProfileFormDialog
				open={editOpen}
				onOpenChange={setEditOpen}
				title="Редактировать профиль"
				description="Обновите имя или аватарку."
				initialName={user.name}
				initialAvatar={user.avatar}
				submitLabel="Сохранить"
				isSubmitting={isSubmitting}
				onSubmit={handleUpdateProfile}
			/>
		</>
	);
}
