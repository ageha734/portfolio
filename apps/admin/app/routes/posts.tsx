import { createFileRoute } from "@tanstack/react-router";
import { PostsList } from "~/features/posts";

export const Route = createFileRoute("/posts")({
    component: PostsList,
});
