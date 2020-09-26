import { useRouter } from "next/router";
import Head from "next/head";
import {
  Page,
  Text,
  Card,
  Note,
  Code,
  Spacer,
  Display,
  Divider,
  Button,
  Collapse,
  Grid,
  Heading,
  Row,
  User,
  Col,
  Link,
  Image,
} from "@geist-ui/react";
import LazyHero from "react-lazy-hero";
import Meta from "../../components/meta.js";

const Home = (props) => (
  <>
    <Page>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Movie Night Dashboard
      </h1>
      <Collapse.Group accordion={true}>
        <Collapse
          shadow
          title="Your Access QR Code"
          subtitle="Without this you won't be able to enter the movie."
          style={{ marginBottom: "30px", background: 'hsl(0,0%,98%)' }}
        >
          <img src={props.events[0].ticket} />
        </Collapse>
        <Collapse
          shadow
          title="Order Food"
          subtitle="This will become available on the day."
          style={{  background: 'hsl(0,0%,98%)', marginBottom: "30px", }}
        >
          <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
          <iframe
            class="airtable-embed airtable-dynamic-height"
            src={"https://airtable.com/embed/shr8L0i2uayfVZxdg?prefill_Ticket%20ID="+'recxRtuyvaRcJgvTE'}
            frameborder="0"
            onmousewheel=""
            width="403"
            height="1443"
            style={{
              background: "transparent",
              position: "relative",
              top: "-140px",
              left: "-2rem",
              marginBottom: "-170px",
            }}
          ></iframe>
        </Collapse>
        <Collapse
          shadow
          title="Key Details"
          subtitle="Everything you need to know about the event."
          style={{ marginBottom: "30px", background: 'hsl(0,0%,98%)' }}
        >
          <Text>
            <strong>When:</strong> {props.events[0].date}
          </Text>
          <Text>
            <strong>Location:</strong> Gymnasium
          </Text>
          <Text>
            <strong>Movie:</strong> TBD
          </Text>
          <Text>
            <strong>Contact Email:</strong>{" "}
            <a href="mailto:23samuel.p@gwa.edu.sg">23samuel.p@gwa.edu.sg</a>
          </Text>
        </Collapse>
      </Collapse.Group>
      <Divider y={5} style={{ textAlign: "center" }}>
        By Student Council
      </Divider>
    </Page>
  </>
);

export async function getServerSidePaths() {
  const paths = await fetch(
    'http://sampoder-api.herokuapp.com/v0.1/MovieNight/People?select={"fields":["ID"]}'
  )
    .then((r) => r.json())
    .then((paths) =>
      paths.map(({ id, fields }) => ({
        params: {
          user: fields["ID"],
        },
      }))
    );
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  console.log(params);
  function filterSlugs(object) {
    return object.fields["ID"] == params.user;
  }
  console.log(
    "http://sampoder-api.herokuapp.com/v0.1/MovieNight/People?filterByFormula=%7BRECORD_ID()%7D%3D" +
      params.user
  );
  const events = await fetch(
    "http://sampoder-api.herokuapp.com/v0.1/MovieNight/People?filterByFormula=%7BRECORD_ID()%7D%3D" +
      params.user
  )
    .then((r) => r.json())
    .then((events) => events.filter(filterSlugs))
    .then((events) =>
      events.map(({ id, fields }) => ({
        id,
        ticket: fields["Ticket"],
        date: fields["Days"],
      }))
    );
  console.log(events);
  return { props: { events } };
}

export default Home;
