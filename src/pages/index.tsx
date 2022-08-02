import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";

import { forwardRef } from "react";

import {
  Container,
  Title,
  Accordion,
  AppShell,
  Autocomplete,
  Header,
  Space,
  Group,
  Avatar,
  Text,
  MantineColor,
  SelectItemProps,
  Input,
} from "@mantine/core";

import { search } from "../api";

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  description: string;
  image: string;
}

const Home: NextPage = () => {
  const [term, setTerm] = useState("");

  const { data, isLoading, isFetched } = useQuery(
    ["search", term],
    () => search(term),
    {
      enabled: !!term,
      initialData: [],
    }
  );

  const autocomplete = data && (
    <Autocomplete
      label="Choose FAQ entry"
      placeholder="Pick one"
      data={data}
      onChange={(value) => setTerm(value)}
    />
  );

  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container size="sm">
        <Title align="center">Frequently Asked Questions</Title>
        <Space h="md" />

        <Input
          placeholder="Your email"
          onChange={(event) => setTerm(event.target.value)}
        />

        <Space h="md" />

        {!data && <>Loading</>}

        {data?.map((entry, idx) => {
          return (
            <Accordion variant="separated" key={idx}>
              <Accordion.Item value="reset-password">
                <Accordion.Control>{entry.title}</Accordion.Control>
                <Accordion.Panel>{entry.text}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </Container>
    </AppShell>
  );
};

export default Home;
