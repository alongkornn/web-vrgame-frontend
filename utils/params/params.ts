import { useParams } from "next/navigation";

export function getId(): string | null {
    const params = useParams() as Record<string, string | undefined>;
    return params.id || null;
  }
  
