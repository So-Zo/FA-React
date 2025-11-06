import React from "react";
import { Link } from "react-router-dom";
import TableOfContents, { TocSectionProps } from "../../ui/TableOfContents";

const MangaHistory: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "OVERVIEW",
      quickLinks: [
        { label: "Timeline Breakdown", anchor: "#timeline-breakdown" },
        { label: "Key Figures & Contributors", anchor: "#key-figures" },
        { label: "Influences & Cultural Impact", anchor: "#influences-impact" },
        {
          label: "Controversies & Turning Points",
          anchor: "#controversies-turning-points",
        },
        { label: "Further Reading & Sources", anchor: "#further-reading" },
      ],
      deepLinks: [
        { label: "Manga Directory", path: "/manga/directory", exists: true },
        { label: "Manga Encyclopedia", path: "/manga", exists: true },
      ],
    },
  ];

  return (
    <div className="manga-page manga-history-page">
      <header>
        <div className="image-header">
          <img
            src="/images/video-games/VideoGamesHeader.jpg"
            alt="Video Games Overview"
          />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Video Games Page"
          placeholder="Search for Characters, Universes, etc."
        />
      </header>

      <hr />

      {/* Table of Contents */}
      <TableOfContents
        sections={tocSections}
        title="Manga History Overview"
        description="Use this table of contents to navigate the history of manga."
      />

      <main id="main-content">
        {/* 2. Timeline Breakdown */}
        <section className="section-content" id="timeline-breakdown">
          <h2>Timeline Breakdown</h2>

          <h3>Early Origins (Pre-Modern Era)</h3>
          <p>
            The roots of manga can be traced to various traditional Japanese art
            forms. The 12th-century "Chōjū-giga" (Animal Scrolls) by Bishop Toba
            featured anthropomorphic animals in sequential illustrations that
            satirized Buddhist priests. Ukiyo-e woodblock prints of the Edo
            period (1603-1867) established many visual conventions later adopted
            by manga, including bold outlines, flat perspectives, and expressive
            faces.
          </p>
          <p>
            Hokusai, the renowned ukiyo-e artist, first used the term "manga"
            (meaning "whimsical pictures") for his sketchbooks published between
            1814 and 1878. These weren't sequential narratives but collections
            of sketches showing everyday life, supernatural creatures, and
            landscapes. Political cartoons and satirical illustrations
            flourished in the late Edo and Meiji periods, influenced by Western
            publications brought to Japan after the country's opening to foreign
            trade.
          </p>

          <h3>Early Modern Manga 1900s-1930s</h3>
          <p>
            The modern era of manga began with newspaper comics and children's
            magazines. "Jiji Manga" by Rakuten Kitazawa, published in 1902, is
            often considered the first modern manga series. Children's magazines
            like "Shōnen Club" (1914) and "Shōjo Club" (1923) featured manga
            stories aimed at specific gender demographics, establishing a
            publishing model that continues today.
          </p>
          <p>
            Western comics and animation, particularly Disney, influenced
            Japanese artists during this period. The four-panel comic strip
            format (yonkoma) became popular for humor manga. As Japan's
            militarism increased in the 1930s, manga was increasingly used for
            propaganda purposes, promoting nationalism and military values to
            young readers.
          </p>

          <h3>Post-War Revolution: The Tezuka Era (1940s-1950s)</h3>
          <p>
            World War II devastated Japan's publishing industry, but manga
            quickly reemerged during the American occupation as affordable
            entertainment. The most significant development was the debut of
            Osamu Tezuka, often called the "God of Manga." Tezuka's "New
            Treasure Island" (1947) revolutionized manga with cinematic
            techniques inspired by Disney and French films, using dynamic panel
            layouts and "camera movements" to create a more immersive reading
            experience.
          </p>
          <p>
            Tezuka's prolific output included "Astro Boy" (1952), "Princess
            Knight" (1953), and "Kimba the White Lion" (1950), establishing many
            conventions of modern manga. His work demonstrated manga's potential
            to tell sophisticated, long-form stories across genres. The
            distinctive large eyes that became characteristic of manga were
            partly inspired by Disney animation and partly developed to enhance
            emotional expressiveness.
          </p>
          <p>
            This period also saw the emergence of rental manga (kashihon manga),
            inexpensive books rented from shops that allowed creators to explore
            more mature themes. Artists like Yoshihiro Tatsumi developed
            "gekiga" (dramatic pictures), a more realistic, adult-oriented style
            of manga addressing social issues and psychological themes.
          </p>

          <h3>Diversification and Maturation (1960s-1970s)</h3>
          <p>
            The 1960s and 1970s saw manga diversify into distinct demographic
            categories with specialized magazines. Weekly shōnen (boys')
            magazines like "Weekly Shōnen Magazine" (1959) and "Weekly Shōnen
            Jump" (1968) featured action, sports, and adventure series. Shōjo
            (girls') manga evolved dramatically as female creators like Moto
            Hagio and Keiko Takemiya formed the "Year 24 Group" (named for their
            birth year, Showa 24 or 1949), bringing psychological depth, gender
            exploration, and innovative visual techniques to girls' comics.
          </p>
          <p>
            Manga for adult readers expanded with seinen (men's) and josei
            (women's) magazines. Influential works of this era include "Ashita
            no Joe" (Tomorrow's Joe), a boxing drama addressing social
            inequality; "Lone Wolf and Cub," a historical samurai epic; and "The
            Rose of Versailles," a shōjo classic set during the French
            Revolution. The alternative manga movement produced experimental
            works in magazines like "Garo," which emphasized artistic expression
            and social commentary.
          </p>
          <p>
            This period also saw the rise of genres that would become iconic in
            manga: giant robot/mecha series, magical girls, sports manga, and
            horror manga. The relationship between manga and anime strengthened,
            with successful manga series increasingly adapted into television
            animation.
          </p>

          <h3>The Golden Age and International Expansion (1980s-1990s)</h3>
          <p>
            The 1980s and 1990s are often considered manga's golden age, with
            unprecedented commercial success and creative diversity. Landmark
            series like Akira Toriyama's "Dragon Ball," Rumiko Takahashi's
            "Ranma ½," and Naoko Takeuchi's "Sailor Moon" achieved massive
            popularity. Katsuhiro Otomo's cyberpunk epic "Akira" (1982-1990)
            demonstrated manga's potential for sophisticated science fiction
            storytelling and was adapted into an influential animated film that
            helped introduce manga to Western audiences.
          </p>
          <p>
            The economic bubble of the 1980s fueled manga's expansion, with
            publishers investing in new magazines and formats. The tankōbon
            format (collected volumes) became the standard way to collect and
            preserve manga series, creating a substantial back-catalog market.
            Manga cafés where customers could read from extensive libraries
            became popular social spaces.
          </p>
          <p>
            Manga began to gain international recognition during this period.
            Translations appeared in Europe, particularly France, where Japanese
            comics were respected as "la nouvelle manga." In North America,
            companies like Viz Media and Dark Horse Comics began publishing
            translated manga, though often "flipped" to read left-to-right and
            with cultural references modified for Western audiences.
          </p>

          <h3>Digital Revolution and Global Phenomenon (2000s-Present)</h3>
          <p>
            The 21st century has transformed manga through digital technology,
            globalization, and changing reader demographics. Digital tools have
            changed how manga is created, with many artists adopting tablets and
            specialized software, though traditional methods remain in use.
            Digital distribution platforms and subscription services like
            Shueisha's Manga Plus offer simultaneous global release of new
            chapters, reducing the gap between Japanese and international
            readers.
          </p>
          <p>
            Manga has achieved unprecedented global popularity, becoming a major
            cultural export for Japan. Series like "Naruto," "One Piece," and
            "Attack on Titan" have achieved massive international followings.
            The influence of manga aesthetics and storytelling approaches can be
            seen in comics worldwide, from American graphic novels to Korean
            manhwa and Chinese manhua.
          </p>
          <p>
            New publishing models have emerged, including webtoons
            (vertically-scrolling digital comics) and self-published doujinshi
            (fan comics) that can achieve commercial success. The boundaries
            between professional and amateur creation have blurred, with many
            successful creators starting in self-publishing or online platforms.
            Manga has diversified further, with greater representation of LGBTQ+
            themes, international settings, and cross-cultural perspectives.
          </p>
        </section>

        {/* 3. Key Figures & Contributors */}
        <section className="section-content" id="key-figures">
          <h2>Key Figures & Contributors</h2>

          <div className="figure-cards">
            <div className="figure-card">
              <h3>Osamu Tezuka (1928-1989)</h3>
              <p>
                Often called the "God of Manga" and "Father of Manga," Tezuka
                revolutionized the medium with cinematic storytelling techniques
                and thematic depth. His prolific output (estimated at 150,000
                pages and 700 manga series) spanned every genre from children's
                comics to adult drama. Key works include "Astro Boy," "Black
                Jack," "Phoenix," and "Buddha." Tezuka also pioneered anime
                production, establishing the relationship between manga and
                animation that continues today.
              </p>
            </div>

            <div className="figure-card">
              <h3>Machiko Hasegawa (1920-1992)</h3>
              <p>
                Creator of "Sazae-san," one of Japan's most beloved and
                longest-running manga series (1946-1974). Hasegawa was one of
                the first successful female manga artists, and her domestic
                comedy about the Fuguta family became a cultural institution,
                later adapted into a TV anime that continues to air today. Her
                work captured the changing nature of Japanese family life during
                the post-war period.
              </p>
            </div>

            <div className="figure-card">
              <h3>Yoshihiro Tatsumi (1935-2015)</h3>
              <p>
                Pioneer of "gekiga" (dramatic pictures), a more realistic,
                adult-oriented style of manga that emerged in the late 1950s.
                Tatsumi's work addressed social issues, psychological struggles,
                and the darker aspects of urban life. His autobiography "A
                Drifting Life" chronicles the development of manga in post-war
                Japan. Tatsumi's emphasis on manga as a serious artistic medium
                influenced generations of creators.
              </p>
            </div>

            <div className="figure-card">
              <h3>The Year 24 Group</h3>
              <p>
                A cohort of female manga artists born around 1949 (Showa year
                24) who revolutionized shōjo manga in the 1970s. Key members
                include Moto Hagio ("The Heart of Thomas"), Keiko Takemiya
                ("Kaze to Ki no Uta"), and Riyoko Ikeda ("The Rose of
                Versailles"). They introduced psychological complexity, gender
                exploration, and innovative visual techniques to girls' comics,
                elevating shōjo manga to artistic prominence and expanding its
                thematic range.
              </p>
            </div>

            <div className="figure-card">
              <h3>Akira Toriyama (1955-2024)</h3>
              <p>
                Creator of globally influential series including "Dr. Slump" and
                "Dragon Ball." Toriyama's distinctive art style, humor, and
                action sequences have influenced countless manga artists and
                global pop culture. "Dragon Ball" became one of the best-selling
                manga series of all time and helped define the battle shōnen
                genre. His character designs have also been featured in video
                games like the Dragon Quest series.
              </p>
            </div>

            <div className="figure-card">
              <h3>Naoki Urasawa (1960-)</h3>
              <p>
                Acclaimed creator of sophisticated thriller and mystery series
                including "Monster," "20th Century Boys," and "Pluto." Urasawa's
                work is known for complex plotting, psychological depth, and
                realistic art style. He has received numerous awards and
                critical recognition for elevating manga storytelling. His work
                demonstrates manga's capacity for literary and artistic
                excellence.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Influences & Cultural Impact */}
        <section className="section-content" id="influences-impact">
          <h2>Influences & Cultural Impact</h2>

          <h3>What Influenced Manga</h3>
          <h4>Traditional Japanese Art</h4>
          <p>
            Manga draws from various Japanese artistic traditions, including
            ukiyo-e woodblock prints, emakimono scrolls, and zenga (Zen Buddhist
            paintings). These influences can be seen in compositional
            techniques, line work, and visual symbolism. The stylized
            representation of emotions and use of visual shorthand derive partly
            from these traditional art forms.
          </p>

          <h4>Western Comics and Animation</h4>
          <p>
            American comics and Disney animation significantly influenced
            manga's development, particularly in the post-war period. Osamu
            Tezuka openly acknowledged Disney's influence on his character
            designs and cinematic storytelling approach. European comics,
            particularly French and Belgian bandes dessinées, also influenced
            certain manga creators, especially in science fiction and fantasy
            genres.
          </p>

          <h4>Japanese History and Society</h4>
          <p>
            Manga has been shaped by Japan's historical experiences, including
            the trauma of World War II, post-war reconstruction, economic boom
            and bust cycles, and changing social values. The emphasis on hard
            work, perseverance, and self-improvement in many manga reflects
            Japanese cultural values. Contemporary social issues, from
            technological change to demographic challenges, are often explored
            through manga narratives.
          </p>

          <h4>Publishing Industry Structures</h4>
          <p>
            The development of manga has been significantly shaped by Japan's
            unique publishing industry. The magazine serialization model,
            demographic targeting (shōnen, shōjo, seinen, josei), editor-creator
            relationships, and the tankōbon collection format have all
            influenced how manga stories are structured and told. Competition
            between publishers has driven innovation in content and marketing
            approaches.
          </p>

          <h3>Manga's Cultural Impact</h3>
          <h4>Japanese Popular Culture</h4>
          <p>
            Manga has become a cornerstone of Japanese popular culture,
            influencing fashion, slang, advertising, and even government
            communications. Characters from popular manga appear on everything
            from airplanes to public safety posters. Manga has helped shape
            Japanese visual culture and storytelling conventions across media.
            The manga industry represents a significant economic sector, with
            annual sales in the billions of dollars.
          </p>

          <h4>Global Pop Culture</h4>
          <p>
            As part of Japan's "soft power," manga has influenced global visual
            culture and storytelling. Manga aesthetics and narrative techniques
            have been adopted by comics creators worldwide. The success of manga
            has inspired similar industries in other countries, including Korean
            manhwa and Chinese manhua. Manga has introduced international
            audiences to aspects of Japanese culture, language, and social
            norms.
          </p>

          <h4>Transmedia Storytelling</h4>
          <p>
            Manga has pioneered transmedia storytelling approaches, with
            properties extending across anime, video games, light novels,
            merchandise, and live-action adaptations. This "media mix" strategy
            has become a model for entertainment franchises globally. The
            relationship between manga and anime has been particularly
            significant, with each medium influencing the other's development.
          </p>

          <h4>Artistic and Literary Recognition</h4>
          <p>
            Manga has increasingly gained recognition as a legitimate artistic
            and literary medium. Museums worldwide have hosted manga
            exhibitions, and academic institutions offer courses in manga
            studies. Award-winning works like Naoki Urasawa's "Monster" and
            Katsuhiro Otomo's "Akira" have demonstrated manga's capacity for
            sophisticated storytelling. Manga has provided a platform for
            exploring complex social, philosophical, and psychological themes.
          </p>
        </section>

        {/* 5. Controversies & Turning Points */}
        <section className="section-content" id="controversies-turning-points">
          <h2>Controversies & Turning Points</h2>

          <h3>Content Controversies and Censorship</h3>
          <p>
            Manga has faced various censorship challenges throughout its
            history. In the 1960s and 1970s, gekiga and alternative manga pushed
            boundaries with explicit content, leading to public debates. More
            recently, concerns about sexual content, particularly involving
            young-appearing characters, have led to regulatory efforts in Japan
            and import restrictions in some countries. The Tokyo Metropolitan
            Ordinance Regarding the Healthy Development of Youths (revised in
            2010) sparked protests from manga creators and publishers who viewed
            it as potential censorship.
          </p>

          <h3>The Digital Transition</h3>
          <p>
            The shift from print to digital has transformed manga creation,
            distribution, and consumption. Traditional publishers have struggled
            to adapt their business models, while new platforms have emerged.
            Piracy through scanlation (fan translation and scanning) sites has
            been both a challenge to the industry and a factor in manga's
            international spread. The rise of webtoons and other digital-native
            formats has challenged the traditional page-based manga format.
          </p>

          <h3>Representation and Diversity</h3>
          <p>
            While manga encompasses diverse genres and themes, it has faced
            criticism regarding representation of gender, sexuality, race, and
            ethnicity. Stereotypical portrayals of non-Japanese characters have
            drawn criticism. At the same time, manga has provided space for
            exploring LGBTQ+ themes, particularly in shōjo and josei categories,
            though these representations have sometimes been problematic. Recent
            years have seen more diverse creator voices and more nuanced
            representations.
          </p>

          <h3>Working Conditions</h3>
          <p>
            The manga industry has been criticized for demanding work schedules,
            with creators often working extremely long hours to meet weekly
            deadlines. Health issues among manga artists are common, with some
            creators hospitalized for exhaustion. The assistant system, where
            lead artists employ junior artists to help with backgrounds and
            details, has been both a training ground and a source of labor
            concerns. Digital tools have changed workflows but haven't
            necessarily reduced workloads.
          </p>

          <h3>Globalization and Cultural Context</h3>
          <p>
            As manga has gone global, questions have arisen about translation,
            localization, and cultural context. Early localization often heavily
            modified content for Western audiences, while modern approaches tend
            to preserve more Japanese elements. The growth of simulpublication
            (simultaneous global release) has raised questions about whether
            creators are now considering international audiences when creating
            manga. Some critics worry about the "flattening" of manga's Japanese
            cultural specificity as it becomes a global medium.
          </p>
        </section>

        {/* 6. Further Reading / Sources - Simplified */}
        <section className="section-content" id="further-reading">
          <h2>Further Reading & Sources</h2>

          <h3>Books</h3>
          <ul>
            <li>
              "Manga! Manga! The World of Japanese Comics" by Frederik L. Schodt
              - Pioneering English-language study of manga
            </li>
            <li>
              "Dreamland Japan: Writings on Modern Manga" by Frederik L. Schodt
              - Follow-up exploring manga's evolution
            </li>
            <li>
              "The Osamu Tezuka Story: A Life in Manga and Anime" by Toshio Ban
              and Tezuka Productions
            </li>
            <li>
              "God of Comics: Osamu Tezuka and the Creation of Post-World War II
              Manga" by Natsu Onoda Power
            </li>
            <li>
              "Manga: A Brief History" by Paul Gravett - Accessible overview of
              manga's development
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default MangaHistory;
