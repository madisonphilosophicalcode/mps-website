import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Madison Philosophical Society, the University of Wisconsin-Madison's student-run philosophy club";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// static instance rather than the variable PlayfairDisplay-Italic[wght].ttf,
// which satori cannot parse
const playfairItalic = await readFile(
  join(process.cwd(), "assets/PlayfairDisplay-Italic.woff"),
);

const heroTemple = await readFile(
  join(process.cwd(), "public/images/hero-temple.png"),
);

export default async function OpengraphImage() {
  const background = `data:image/png;base64,${heroTemple.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#490e0e",
        backgroundImage: `url(${background})`,
        backgroundSize: "1200px 675px",
        backgroundPosition: "center",
        fontFamily: "Playfair Display",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(73, 14, 14, 0.62)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 82,
            fontStyle: "italic",
            color: "#e8e2d6",
            lineHeight: 1.1,
            letterSpacing: 2,
          }}
        >
          Madison Philosophical Society
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 31,
            fontStyle: "italic",
            color: "#c9a227",
            letterSpacing: 4,
          }}
        >
          University of Wisconsin&ndash;Madison
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Playfair Display",
          data: playfairItalic,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
