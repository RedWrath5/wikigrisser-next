import React from "react";
import { Layout } from "../components/Layout";
import { Img } from "../components/layout/Img";

const TsdlPage = () => (
    <Layout>
        <div className="flex flex-col text-center items-center justify-self-center w-full px-2 mt-5">
            <Img
                src={"tsdl/goddess.png"}
                width={200}
                height={200}
                className="inline"
            />
            <div>
                <a
                    href="https://discord.gg/kGauTDGD7V"
                    className="text-blue-800 underline text-xl"
                >
                    Discord Server
                </a>
            </div>
            <div>
                <p>
                    <span>Group Stage: Round Robin</span>
                </p>
                <p>
                    <span>Players will be divided into multiple</span>
                    <strong>
                        <span>&nbsp;groups&nbsp;</span>
                    </strong>
                    <span>
                        and into 3 different regions (NA, Europe, Asia) to play round robin.
                    </span>
                </p>
                <p>
                    <span>&nbsp;</span>
                </p>
                <div>
                    <ul>
                        <li>
                            <span>
                                You will play <strong>2 games</strong> with each opponent for
                                points. Each win will count as 1 point:
                            </span>
                        </li>
                    </ul>
                </div>
                <p>
                    <strong>
                        <span>Win: 3&nbsp;</span>
                    </strong>
                    <span>pts (2-0)&nbsp;</span>
                </p>
                <p>
                    <strong>
                        <span>Tie: 1</span>
                    </strong>
                    <span>&nbsp;pt (1-1)</span>
                </p>
                <p>
                    <strong>
                        <span>Lose:</span>
                    </strong>
                    <span>
                        &nbsp;<strong>0</strong> pt (0-2)&nbsp;
                    </span>
                </p>
                <p>
                    <span>&nbsp;</span>
                </p>
                <div>
                    <ul>
                        <li>
                            <span>
                                The player with the most points from each group will move on to{" "}
                                <strong>Stage 2</strong> ( 1 or 2 depending on how many
                                register).
                            </span>
                        </li>
                    </ul>
                </div>
                <p>
                    <span>&nbsp;</span>
                </p>
                <p>
                    <span>
                        *Please note that date and format may change depending on how many
                        players sign up.&nbsp;
                    </span>
                </p>
                <p>
                    <span>Final Stage: Single Elimination&nbsp;</span>
                </p>
                <p>
                    <strong>
                        <span>Best of 3</span>
                    </strong>
                    <span>
                        . Players will be assigned according to results from stage 1. The
                        finals will be Best of 5.
                    </span>
                </p>
                <li>
                    <strong>
                        <span>Top 8 players&nbsp;</span>
                    </strong>
                    <span>will be seeded in the next season!</span>
                </li>
                <p>
                    <span>Prizes:</span>
                </p>
                <ul>
                    <li>
                        <span>
                            1st Place<strong>&nbsp;- $300</strong>
                        </span>
                    </li>
                    <li>
                        <span>
                            2nd Place <strong>- $150</strong>
                        </span>
                    </li>
                    <li>
                        <span>
                            3<sup>rd</sup>/4th Place<strong>&nbsp;- $50</strong>
                        </span>
                    </li>
                </ul>
                <p>
                    <span>&nbsp;</span>
                </p>
                <p>
                    <strong>
                        <span>
                            *Money prizes will depend on the donations and the ticket rewards
                            may increase.
                        </span>
                    </strong>
                    <span>
                        <br />
                        &nbsp;
                    </span>
                </p>
                <p>
                    <span>
                        Thank you to all our contributors, streamers, participants, and the
                        viewers. Please support us by donating! We can&apos;t make this
                        possible without your support. Every dollar counts!
                    </span>
                </p>
                <p>
                    <span>
                        Please PM <strong>Maebari#7146&nbsp;</strong> on discord with your
                        in game name and the amount you wish to donate before making
                        donations so we know who is donating.&nbsp;
                    </span>
                </p>
                <p>
                    <em>
                        <span>
                            We will publicly announce your name to thank you (unless you wish
                            to stay anonymous).
                        </span>
                    </em>
                </p>
                <p>
                    <span>&nbsp;</span>
                </p>
                <p>
                    <span>
                        Directly support us using the <strong>Donate</strong> button below:
                    </span>
                </p>
            </div>
            <div>
                <form
                    action="https://www.paypal.com/donate"
                    method="post"
                    target="_top"
                >
                    <input type="hidden" name="hosted_button_id" value="VSRMGLKTQQFWS" />
                    <input
                        type="image"
                        src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
                        name="submit"
                        title="PayPal - The safer, easier way to pay online!"
                        alt="Donate with PayPal button"
                    />
                </form>
            </div>
            <div>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdUrHuOQTQ87g7jLb6_aGv548OAJXLV49-b0XREOHmsZ5vVYg/viewform?embedded=true"
                    className="flex"
                    style={{ minHeight: 2500, overflow: "hidden" }}
                    scrolling="no"
                    onLoad={(event) =>
                        (event.currentTarget.width = screen.width.toString())
                    }
                >
                    Loading…
                </iframe>
            </div>
        </div>
    </Layout>
);

export default TsdlPage;