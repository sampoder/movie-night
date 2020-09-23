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
  Grid,
  User,
  Heading,
  Row,
  Col,
  Link,
  Image,
} from "@geist-ui/react";
import LazyHero from "react-lazy-hero";
import Meta from "../components/meta.js";

const Home = () => (
  <>
    <h1>Hey! You shouldn't be here!</h1>
    <Text>Please check your email for your unique link.</Text>
    <style jsx global>{`
      body {
        text-align: center;
        margin-top: 30px;
      }
    `}</style>
  </>
);

export default Home;
