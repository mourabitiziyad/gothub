import { z } from "zod";
import octokit from "~/lib/octokit";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export interface User {
  id: string;
  login: string;
  avatarUrl: string;
  url: string;
}

export interface SearchResponse {
  search: {
    edges: {
      node: User;
    }[];
  };
}

export const githubRouter = createTRPCRouter({
  getUsersList: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const searchQuery = `
        query ($searchTerm: String!) {
          search(query: $searchTerm, type: USER, first: 5) {
            edges {
              node {
                ... on User {
                  id
                  login
                  avatarUrl
                  url
                }
              }
            }
          }
        }
      `;
      try {
        const results = await octokit.graphql<SearchResponse>(searchQuery, {
          searchTerm: input.text,
        });
        const users = results.search.edges.map(({ node }: { node: User }) => ({
          id: node.id,
          login: node.login,
          avatarUrl: node.avatarUrl,
          url: node.url,
        }));
        return users;
      } catch (error) {
        console.error("Error fetching GitHub users:", error);
        throw new Error("Failed to fetch GitHub users");
      }
    }),
});
