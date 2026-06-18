import { useState } from "react";
import { Trash2 } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { FriendProfile } from "@/lib/api/auth";

type FriendsListProps = {
	friends: FriendProfile[];
	onRemove: (friend: FriendProfile) => Promise<void>;
};

function getInitials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}

export function FriendsList({ friends, onRemove }: FriendsListProps) {
	const [friendToRemove, setFriendToRemove] = useState<FriendProfile | null>(
		null,
	);
	const [isRemoving, setIsRemoving] = useState(false);

	async function confirmRemove() {
		if (!friendToRemove) {
			return;
		}

		setIsRemoving(true);
		try {
			await onRemove(friendToRemove);
			setFriendToRemove(null);
		} finally {
			setIsRemoving(false);
		}
	}

	if (friends.length === 0) {
		return (
			<div className="px-4 py-3 text-sm text-muted-foreground">
				Пока нет друзей. Добавьте друга по его UUID-коду.
			</div>
		);
	}

	return (
		<>
			<div className="px-4 py-2">
				<div className="text-sm font-medium">Друзья</div>
			</div>
			<div className="divide-y divide-border">
				{friends.map((friend) => (
					<div
						key={friend.id}
						className="flex items-center gap-3 px-4 py-3"
					>
						<Avatar size="sm">
							{friend.avatar ? (
								<AvatarImage src={friend.avatar} alt="" />
							) : null}
							<AvatarFallback>{getInitials(friend.name)}</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1">
							<div className="truncate text-sm font-medium">{friend.name}</div>
							<div className="text-xs text-muted-foreground">
								{friend.favoriteEventIds.length} любимых
							</div>
						</div>
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							className="text-destructive hover:text-destructive"
							aria-label={`Удалить ${friend.name} из друзей`}
							onClick={() => setFriendToRemove(friend)}
						>
							<Trash2 className="size-4" />
						</Button>
					</div>
				))}
			</div>

			<AlertDialog
				open={friendToRemove !== null}
				onOpenChange={(open) => {
					if (!open) {
						setFriendToRemove(null);
					}
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Удалить друга?</AlertDialogTitle>
						<AlertDialogDescription>
							{friendToRemove
								? `${friendToRemove.name} будет удалён из списка друзей.`
								: null}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isRemoving}>Отмена</AlertDialogCancel>
						<AlertDialogAction
							variant="destructive"
							disabled={isRemoving}
							onClick={confirmRemove}
						>
							Удалить
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
