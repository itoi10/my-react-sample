import { getBucket } from '@extend-chrome/storage';
import { ActionIcon, Avatar, Box, CopyButton, Divider, Flex, Group, Select, Stack, Text, Tooltip } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useState } from 'react';
import { MdDone, MdOutlineContentCopy, MdVolumeUp } from 'react-icons/md';
import { translate } from '../app/translate';

interface MyBucket {
  targetLang: string;
}

const bucket = getBucket<MyBucket>('my-bucket', 'sync');

export const Content = ({
  translatedText,
  originalText,
  targetLang,
}: {
  translatedText: string;
  originalText: string;
  targetLang: string;
}) => {

  const [opened, setOpend] = useState<boolean>(true);
  const [dialog, setDialog] = useState<HTMLDivElement | null>(null);
  const [text, setText] = useState<string>(translatedText);
  const [lang, setLang] = useState<string>(targetLang);

  useClickOutside(() => setOpend(false), null, [dialog]);

  const IconURL = chrome.runtime.getURL('images/extension_128.png');

  const handleChange = async (value: string) => {
    bucket.set({ targetLang: value });
    const newText = await translate(originalText, value);
    setText(newText);
    setLang(value);
  }

  return opened ? (
    <Box
      sx={(theme) => ({
        backgroundColor: 'white',
        textAlign: 'left',
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        maxWidth: 400,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3);',
        zIndex: 2147483550,
      })}
      component="div"
      ref={setDialog}
    >
      <Flex
        pb="xs"
        gap="xs"
        justify="flex-start"
        align="center"
      >
        <Avatar src={IconURL} />
        <Text size="md">訳文:</Text>
        <Select
          value={lang}
          onChange={(value:string) => handleChange(value)}
          size="xs"
          data={[
            { label: '英語', value: 'EN' },
            { label: '韓国語', value: 'KO' },
            { label: '中国語', value: 'ZH' },
          ]}
        />
      </Flex>
      <Divider/>
      <Stack
        pt="sm"
        spacing="xs"
        style={{textAlign: 'left'}}
      >
        <Text size="sm">
          {text}
        </Text>
        <Group
          position="right"
          spacing="xs"
        >
          <Tooltip label="音声読み上げ" withArrow>
            <ActionIcon>
              <MdVolumeUp />
            </ActionIcon>
          </Tooltip>
          <CopyButton
            value={text}
          >
            {({copied, copy}) => (
              <Tooltip
                label={copied ? '訳文をコピーしました' : 'クリップボードにコピー'}
                withArrow
              >
                <ActionIcon onClick={copy}>
                  {copied ? <MdDone/> : <MdOutlineContentCopy/>}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </Stack>
    </Box>
  ) : (
    <></>
  );
}
