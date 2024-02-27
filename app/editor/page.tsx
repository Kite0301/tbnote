import { Card, Stage } from "@/type";
import Editor from "../_components/Editor";

export default async function EditorPage() {
  const cardList: Card[] = await getCardList()
  const stageList: Stage[] = await getStageList()

  return (
    <main className="flex flex-col items-center h-screen overflow-hidden">
      <div>Editor</div>
      <Editor cardList={cardList} stageList={stageList} />
    </main>
  );
}

const getCardList = async () => {
  const response = await fetch('https://kite0301.github.io/tbnote-data/card.json');
  const data = await response.json()
  return data.map((d: any) => (
    {
      name: d['Name'],
      number: d['Number'],
      specialCost: d['SpecialCost'],
      square: d['Square'],
    }
  ))
}

const getStageList = async () => {
  const response = await fetch('https://kite0301.github.io/tbnote-data/stage.json');
  return await response.json()
}
