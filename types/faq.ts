export interface FAQ {
    Id: number;
    Question: string;
    Answer: string;
    Link?: {
      url: string;
      text: string;
    };
  }