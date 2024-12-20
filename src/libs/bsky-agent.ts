import type { AppBskyFeedGetFeed } from "@atproto/api";
import { AtpAgent } from "@atproto/api";

const service = "https://bsky.social";

const bskyAgent = () => {
  return new AtpAgent({ service });
};
export type AgentType = ReturnType<typeof bskyAgent>;

type Opt = {
  limit: number;
  cursor: string;
  feed: string;
};

export class Agent {
  public agent: AtpAgent;

  constructor() {
    this.agent = bskyAgent();
  }

  async login(identifier: string, password: string) {
    await this.agent.login({
      identifier: identifier,
      password: password,
    });
    const session = this.agent.session;
    return session;
  }

  async getDid(handle: string) {
    try {
      const res = await this.agent.com.atproto.identity.resolveHandle({
        handle: handle,
      });
      return res.data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async getFeedTimeline(
    opt: Opt = {
      limit: 100,
      cursor: "",
      feed: "",
    }
  ) {
    try {
      const res = await this.agent.app.bsky.feed.getFeed({
        limit: opt.limit,
        cursor: opt.cursor,
        feed: opt.feed,
      });
      return res.data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}
