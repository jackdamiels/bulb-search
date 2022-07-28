import { Embeddings } from "../libs/textai";
import Labels from "../libs/textai/labels";

const myArgs = process.argv.slice(2);

const embeddings = new Embeddings("http://localhost:8000");

const test = async () => {
  try {
    let labels = new Labels("http://localhost:8000");

    let data = [
      "Dodgers lose again, give up 3 HRs in a loss to the Giants",
      "Giants 5 Cardinals 4 final in extra innings",
      "Dodgers drop Game 2 against the Giants, 5-4",
      "Flyers 4 Lightning 1 final. 45 saves for the Lightning.",
      "Slashing, penalty, 2 minute power play coming up",
      "What a stick save!",
      "Leads the NFL in sacks with 9.5",
      "UCF 38 Temple 13",
      "With the 30 yard completion, down to the 10 yard line",
      "Drains the 3pt shot!!, 0:15 remaining in the game",
      "Intercepted! Drives down the court and shoots for the win",
      "Massive dunk!!! they are now up by 15 with 2 minutes to go",
    ];

    // List of labels
    let tags = ["Baseball", "Football", "Hockey", "Basketball"];

    console.log("%-75s %s", "Text", "Label");
    console.log("-".repeat(100));

    for (let text of data) {
      const res = await labels.label(text, tags);
      const first = res[0];
      let labe;
      if (first) {
        console.log("%-75s %s", text, tags[first.id]);
      }
    }

    tags = ["😀", "😡"];

    console.log();
    console.log("%-75s %s", "Text", "Label");
    console.log("-".repeat(100));

    for (let text of data) {
      let label = await labels.label(text, tags);
      const first = label[0];
      if (first) {
        console.log("%-75s %s", text, tags[first.id]);
      }
    }
  } catch (e) {
    console.trace(e);
  }
};

const importEntries = async () => {
  // const entries = readFileSync("scripts/entries.json", "utf8");
  // // const result = await client.collections("entries").documents().import(entries);
  // const json = JSON.parse(entries) as any[];
  // json.forEach((entry) => {
  //   console.log(entry);
  // });
};

test();

export default importEntries;
