import { objections } from "@/data/objections";
import type { Objection, ObjectionId } from "@/types/objection";

export function getObjection(id: ObjectionId): Objection { return objections.find((item) => item.id === id) ?? objections.find((item) => item.id === "OTHER")!; }
export function classifyObjection(statement: string): Objection {
  const normalized = statement.toLowerCase();
  return objections.find((item) => item.triggerPhrases.some((phrase) => normalized.includes(phrase))) ?? getObjection("OTHER");
}
