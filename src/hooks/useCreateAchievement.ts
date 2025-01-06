import { leaderboardQueryKey } from "@/hooks/useLeaderboard";
import { leaderboardPositionQueryKey } from "@/hooks/useLeaderboardPosition";
import { questsQueryKey } from "@/hooks/useQuests";
import { default as liteflow } from "@/lib/liteflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import router from "next/router";

export default function useCreateAchievement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      address,
      questId,
    }: {
      address: string;
      questId: string;
    }) => {
      const res = await liteflow.achivements.create({
        questId,
        userAddress: address,
      });
      if (res.error) throw new Error(res.error.message);
      if (res.data.redirect) {
        await router.push(res.data.redirect);
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: leaderboardQueryKey() }),
        queryClient.invalidateQueries({ queryKey: questsQueryKey(address) }),
        queryClient.invalidateQueries({
          queryKey: leaderboardPositionQueryKey(address),
        }),
      ]);
    },
  });
}