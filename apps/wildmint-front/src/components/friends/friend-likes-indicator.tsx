import type { FriendProfile } from "@/lib/api/auth";
import {
	Avatar,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type FriendLikesIndicatorProps = {
	friends: FriendProfile[];
	className?: string;
	size?: "sm" | "default";
};

function getInitials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}

export function FriendLikesIndicator({
	friends,
	className,
	size = "default",
}: FriendLikesIndicatorProps) {
	if (friends.length === 0) {
		return null;
	}

	const visibleFriends = friends.slice(0, 3);
	const hiddenCount = friends.length - visibleFriends.length;
	const names = friends.map((friend) => friend.name).join(", ");

	if (friends.length === 1) {
		const friend = friends[0];
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Badge variant="secondary" className={className}>
						<Avatar size="sm" className="size-4">
							{friend.avatar ? (
								<AvatarImage src={friend.avatar} alt="" />
							) : null}
							<AvatarFallback className="text-[8px]">
								{getInitials(friend.name)}
							</AvatarFallback>
						</Avatar>
						<span className="max-w-24 truncate">{friend.name}</span>
					</Badge>
				</TooltipTrigger>
				<TooltipContent>{names}</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div className={className}>
					<AvatarGroup>
						{visibleFriends.map((friend) => (
							<Avatar key={friend.id} size={size}>
								{friend.avatar ? (
									<AvatarImage src={friend.avatar} alt="" />
								) : null}
								<AvatarFallback>{getInitials(friend.name)}</AvatarFallback>
							</Avatar>
						))}
						{hiddenCount > 0 ? (
							<AvatarGroupCount>+{hiddenCount}</AvatarGroupCount>
						) : null}
					</AvatarGroup>
				</div>
			</TooltipTrigger>
			<TooltipContent>{names}</TooltipContent>
		</Tooltip>
	);
}
