import { Avatar, AvatarImage } from "./ui/avatar"

interface UserProfileInfoProps {
  user:
    | {
        name?: string | null
        email?: string | null
        image?: string | null
      }
    | undefined
}

const UserProfileInfo = ({ user }: UserProfileInfoProps) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3">
      <Avatar className="h-[48px] w-[48px] lg:h-[36px] lg:w-[36px]">
        <AvatarImage
          className="rounded-full border-2 border-solid border-primary"
          src={user?.image ?? ""}
        />
      </Avatar>

      <div className="flex flex-col">
        <h3 className="truncate text-base font-bold">{user?.name}</h3>
        <p className="truncate text-xs">{user?.email}</p>
      </div>
    </div>
  )
}

export default UserProfileInfo
