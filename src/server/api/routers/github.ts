import { z } from "zod";
import { graphqlWithAuth } from "~/lib/octokit";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Define TypeScript interfaces
interface User {
  id: string;
  login: string;
  avatarUrl: string;
  url: string;
}

interface UserInfo extends User {
  name?: string;
  bio?: string;
  location?: string;
  company?: string;
  email?: string;
  websiteUrl?: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  starredRepositories: { totalCount: number };
  organizations: { nodes: { id: string, avatarUrl: string; login: string }[] };
  contributionsCollection: {
    totalCommitContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: {
          color: string;
          contributionCount: number;
          date: string;
        }[];
      }[];
    };
    restrictedContributionsCount: number;
  };
}

export interface Repository {
  name: string;
  description: string;
  url: string;
  languages: { nodes: { name: string; color: string }[] };
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  owner: { login: string; avatarUrl: string };
}

interface RepositoriesResponse {
  user: {
    repositories: {
      totalCount: number;
      nodes: Repository[];
    };
  };
}

// Define your TRPC router with the added TypeScript interfaces
export const githubRouter = createTRPCRouter({
  getUsersList: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }): Promise<User[]> => {
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
        const results = await graphqlWithAuth<{ search: { edges: { node: User }[] } }>(searchQuery, {
          searchTerm: input.text,
        });
        const users: User[] = results.search.edges.map(({ node }) => ({
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
    .query(async ({ input }): Promise<UserInfo> => {
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
          starredRepositories {
            totalCount
          }
          organizations(first: 100) {
            nodes {
              id
              avatarUrl
              login
            }
          }
          contributionsCollection {
            totalCommitContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                }
              }
            }
            restrictedContributionsCount
          }
        }
      }
    `;
      try {
        const result = await graphqlWithAuth<{ user: UserInfo }>(userQuery, {
          username: input.username,
        });
        return result.user;
      } catch (error) {
        console.error("Error fetching GitHub user:", error);
        throw new Error("Failed to fetch GitHub user");
      }
    }),
  getUserRepositories: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input }): Promise<RepositoriesResponse> => {
      const reposQuery = `
        query ($username: String!) {
          user(login: $username) {
            repositories(first: 5, orderBy: { field: UPDATED_AT, direction: DESC }) {
              totalCount
              nodes {
                name
                description
                url
                languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
                  nodes {
                    name
                    color
                  }
                }
                stargazerCount
                forkCount
                updatedAt
                owner {
                  login
                  avatarUrl
                }
              }
            }
          }
        }
      `;
      try {
        const data = await graphqlWithAuth<RepositoriesResponse>(reposQuery, {
          username: input.username,
        });
        return data;
      } catch (error) {
        console.error("Error fetching GitHub user repositories:", error);
        throw new Error("Failed to fetch GitHub user repositories");
      }
    }),
});
