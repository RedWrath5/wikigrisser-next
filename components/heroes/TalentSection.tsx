import Image from 'next/image'
import { Hero } from '../../types/hero';

export function TalentSection({hero: {factions, talent, name}}: {hero: Hero}) {
  return (
    <div className="mb-2 pt-2 pb-2 grid grid-cols-12 gap-2">
      <div className="col-span-1 text-center">
          {
              factions.map(faction =>
                <div key={faction}>
                  <Image src={'/factions/' + faction + '.png'} width={50} height={50}></Image>
                </div>
              )
          }
      </div>
      <div className="col-span-2 text-center">
        <Image src={"/talents/" + name +".png"} width={150} height={150}></Image>
      </div>
      <div className="col-span-9">
      <p>Talent: {talent.name}</p>
      {
          talent.descriptionMarkdown ?  
            <div dangerouslySetInnerHTML={{ __html: talent.descriptionMarkdown }} /> 
          :
          <p>Talent: {talent.description}</p>
        }

        
      </div>
    </div>
  );
}