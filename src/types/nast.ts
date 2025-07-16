import { Node, Parent } from "https://esm.sh/@types/unist@3.0.3/index.js";

export interface Text extends Node {
  type: "text";
  value: string;
}

export interface Hashtag extends Node {
  type: "hashtag";
  /** The name as it was written in the event */
  name: string;
  /** The lowercase canonical name */
  hashtag: string;
}

export interface Link extends Node {
  type: "link";
  display_value?: string | null;
  title?: string | null;
  url: string;
}

export interface ContentMap {
  text: Text;
  hashtag: Hashtag;
  link: Link;
}

export type Content = ContentMap[keyof ContentMap];

export interface Root extends Parent {
  type: "root";
  children: Content[];
}
