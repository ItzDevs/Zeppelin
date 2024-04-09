import { User } from "discord.js";
import { GuildPluginData } from "knub";
import { LogType } from "../../../data/LogType";
import { createTypedTemplateSafeValueContainer } from "../../../templateFormatter";
import { UnknownUser } from "../../../utils";
import { userToTemplateSafeUser } from "../../../utils/templateSafeObjects";
import { LogsPluginType } from "../types";
import { log } from "../util/log";

export interface LogMemberKickData {
  mod: User | UnknownUser | null;
  user: User;
  caseNumber: number;
  reason: string;
}

export function logMemberKick(pluginData: GuildPluginData<LogsPluginType>, data: LogMemberKickData) {
  return log(
    pluginData,
    LogType.MEMBER_KICK,
    createTypedTemplateSafeValueContainer({
      mod: data.mod ? userToTemplateSafeUser(data.mod) : null,
      user: userToTemplateSafeUser(data.user),
      caseNumber: data.caseNumber,
      reason: data.reason,
    }),
    {
      userId: data.user.id,
      bot: data.user.bot,
    },
  );
}
