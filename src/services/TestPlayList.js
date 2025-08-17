import { add } from "date-fns";

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().split(".")[0] + "Z";
  // example: 2025-08-16T00:55:58Z
}

export const testPlayList = {
  id: "1234567890",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d0000b273df9a35baaa98675256b35177",
    },
  ],
  name: "Test Playlist",
  type: "playlist",
  tracks: {
    total: 9,
    items: [
      {
        added_at: fromToday(-10, true),
        track: {
          id: "2DGa7iaidT5s0qnINlwMjJ",
          name: "The Spectre",
          artists: [{ name: "Alan Walker" }],
          album: {
            name: "The Spectre",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273a6a151ed88a170ae3a81eff5",
              },
            ],
          },
          preview_url: "/music/Alan Walker!The Spectre!The-Spectre!.mp3",
        },
      },
      {
        added_at: fromToday(-22, true),
        track: {
          id: "2",
          name: "Violin - We Don't Talk Anymore",
          artists: [{ name: "Charlie Puth" }, { name: "Music AM4U" }],
          album: {
            name: "The Violin Blossom",
            images: [{ url: "https://images7.alphacoders.com/664/664411.jpg" }],
          },
          preview_url:
            "/music/Charlie Puth!Violin - We Don't Talk Anymore!the-violin-blossom!.mp3",
        },
      },
      {
        added_at: fromToday(-1, true),
        track: {
          id: "3",
          name: "Olly Murs - That Girl v2 (REMIX)",
          artists: [{ name: "Olly Murs" }, { name: "DJ Chen" }],
          album: {
            name: "That Girl",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b2731bf8096876ca5223e4e96eac",
              },
            ],
          },
          preview_url:
            "/music/DJ Chen!Olly Murs - That Girl v2 (REMIX)!That-girl!.mp3",
        },
      },
      {
        added_at: fromToday(0, true),
        track: {
          id: "50nfwKoDiSYg8zOCREWAm5",
          name: "Shivers",
          artists: [{ name: "Ed Sheeran" }],
          album: {
            name: "Cool Shiver",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273ef24c3fdbf856340d55cfeb2",
              },
            ],
          },
          preview_url: "/music/Ed Sheeran!Shivers!Cool-Shiver!.mp3",
        },
      },
      {
        added_at: fromToday(-5, true),
        track: {
          id: "1jLsirPDkUS2g4gnkYua58",
          name: "Ignite",
          artists: [{ name: "K-391" }, { name: "Alan Walker" }],
          album: {
            name: "Ignite",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273eaee7835ad1cd0c435edd7cf",
              },
            ],
          },
          preview_url: "/music/K-391 & Alan Walker!Ignite!Ignite-default!.mp3",
        },
      },
      {
        added_at: fromToday(-12, true),
        track: {
          id: "67O8CWXxPsfz8orZVGMQwf",
          name: "End of Time",
          artists: [
            { name: "K-391" },
            { name: "Alan Walker" },
            { name: "Ahrix" },
          ],
          album: {
            name: "End Of Time",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b27349b9fbf2345c02ca2387a357",
              },
            ],
          },
          preview_url:
            "/music/K-391, Alan Walker & Ahrix!End of Time!End-Of-Time!.mp3",
        },
      },
      {
        added_at: fromToday(-30, true),
        track: {
          id: "01aTsQoKoeXofSTvKuunzv",
          name: "Lean On",
          artists: [
            { name: "Major Lazer" },
            { name: "DJ Snake" },
            { name: "MØ" },
          ],
          album: {
            name: "Lean On",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273d6d24aee7b49a2db98a76856",
              },
            ],
          },
          preview_url: "/music/Major Lazer & DJ Snake!Lean On!Lean-on!.mp3",
        },
      },
      {
        added_at: fromToday(-15, true),
        track: {
          id: "7CQjnYsGLdtcrsp95oBpCv",
          name: "Close To The Sun",
          artists: [{ name: "TheFatRat" }, { name: "DJ Snake" }],
          album: {
            name: "Close To The Sun",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b2733585e6b4f6910a956dc5e35a",
              },
            ],
          },
          preview_url:
            "/music/TheFatRat & Anjulie!Close To The Sun!close-to-the-sun-default!.mp3",
        },
      },
      {
        added_at: fromToday(-8, true),
        track: {
          id: "5xXB7wVgRmBHoMBmcfEE3C",
          name: "MAYDAY",
          artists: [{ name: "TheFatRat" }, { name: "Laura Brehm" }],
          album: {
            name: "MAYDAY",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273baada250536194504307ffd7",
              },
            ],
          },
          preview_url:
            "/music/TheFatRat & Laura Brehm!MAYDAY!MAYDAY-TheFatRat!.mp3",
        },
      },
    ],
  },
};
