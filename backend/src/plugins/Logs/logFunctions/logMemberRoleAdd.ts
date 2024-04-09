import { GuildMember, Role, User } from "discord.js";
import { GuildPluginData } from "knub";
import { LogType } from "../../../data/LogType";
import { createTypedTemplateSafeValueContainer } from "../../../templateFormatter";
import { UnknownRole } from "../../../utils";
import { memberToTemplateSafeMember, userToTemplateSafeUser } from "../../../utils/templateSafeObjects";
import { LogsPluginType } from "../types";
import { log } from "../util/log";

export interface LogMemberRoleAddData {
  mod: User | null;
  member: GuildMember;
  roles: Array<Role | UnknownRole>;
}

export function logMemberRoleAdd(pluginData: GuildPluginData<LogsPluginType>, data: LogMemberRoleAddData) {
  return log(
    pluginData,
    LogType.MEMBER_ROLE_ADD,
    createTypedTemplateSafeValueContainer({
      mod: data.mod ? userToTemplateSafeUser(data.mod) : null,
      member: memberToTemplateSafeMember(data.member),
      roles: data.roles.map((r) => r.name).join(", "),
    }),
    {
      userId: data.member.id,
      roles: Array.from(data.member.roles.cache.keys()),
      bot: data.member.user.bot,
    },
  );
}
