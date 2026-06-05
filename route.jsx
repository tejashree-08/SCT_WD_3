import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "QuizVerse AI — Test Your Knowledge",
    meta: [
      {
        name: "description",
        content:
          "A futuristic quiz platform with 25+ categories, analytics, achievements, streaks and XP.",
      },
      {
        property: "og:title",
        content: "QuizVerse AI",
      },
      {
        property: "og:description",
        content: "Test your knowledge. Track your growth.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/quiz/index.html");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#070914",
        color: "#e9edff",
        fontFamily: "system-ui",
      }}
    >
      Loading QuizVerse AI...
    </div>
  );
}