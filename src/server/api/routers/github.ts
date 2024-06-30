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

export interface User {
  id: string;
  login: string;
  avatarUrl: string;
  url: string;
  name?: string;
  bio?: string;
  location?: string;
  company?: string;
  email?: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  repositories: {
    totalCount: number;
  };
  starredRepositories: {
    totalCount: number;
  };
  gists: {
    totalCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  user: User;
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
  getUserInfo: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const userQuery = `
        query ($username: String!) {
          user(login: $username) {
            id
            login
            name
            avatarUrl
            url
            bio
            location
            company
            email
            websiteUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
            organizations(first: 100) {
              nodes {
                avatarUrl
                login
              }
            }
            achievements: contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `;
      try {
        const result = await octokit.graphql<UserResponse>(userQuery, {
          username: input.username,
        });
        return result.user;
      } catch (error) {
        console.error("Error fetching GitHub user:", error);
        throw new Error("Failed to fetch GitHub user");
      }
    }),
});
