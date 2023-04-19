import { ChannelFragment } from "@dashboard/graphql";
import { useChannelsSearch } from "@dashboard/hooks/useChannelsSearch";
import { FormChange } from "@dashboard/hooks/useForm";
import { mapNodeToChoice } from "@dashboard/utils/maps";
import {
  Card,
  CardContent,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Box, Text } from "@saleor/macaw-ui/next";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "../CardTitle/CardTitle";
import MultiAutocompleteSelectField, {
  MultiAutocompleteChoiceType,
} from "../MultiAutocompleteSelectField";

interface ChannelPermissionProps {
  selectedChannels: string[];
  allChannels?: ChannelFragment[];
  channelsDisplayValues: MultiAutocompleteChoiceType[];
  description: string;
  hasRestrictedChannels: boolean;
  disabled: boolean;
  onChannelChange: FormChange;
  onChange: FormChange;
}

export const ChannelPermission = ({
  description,
  disabled,
  onChange,
  onChannelChange,
  channelsDisplayValues,
  allChannels,
  selectedChannels,
  hasRestrictedChannels,
}: ChannelPermissionProps) => {
  const intl = useIntl();

  const { onQueryChange, filteredChannels } = useChannelsSearch(allChannels);

  const handleAllChannelsChange = () => {
    onChange({
      target: {
        name: "hasRestrictedChannels",
        value: !hasRestrictedChannels,
      },
    });
  };

  return (
    <Card style={{ height: "100%" }}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Channels permissions",
          id: "vz3yxp",
        })}
      ></CardTitle>
      <CardContent>
        <Text as="p" variant="body" size="small" marginBottom={5}>
          {description}
        </Text>

        <ListItem
          role={undefined}
          onClick={handleAllChannelsChange}
          dense
          button
        >
          <ListItemIcon>
            <Checkbox
              data-test-id="full-access"
              color="secondary"
              edge="start"
              checked={hasRestrictedChannels}
              disabled={disabled}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": "fullAccess" }}
            />
          </ListItemIcon>
          <ListItemText
            primary={intl.formatMessage({
              defaultMessage: "Restrict access to channels",
              id: "ay73LS",
            })}
          />
        </ListItem>
        {hasRestrictedChannels && (
          <>
            <Box
              width="100%"
              borderBottomStyle="solid"
              borderBottomWidth={1}
              borderColor="neutralPlain"
              height={1}
              marginTop={9}
              marginBottom={9}
            />
            <MultiAutocompleteSelectField
              disabled={disabled}
              choices={mapNodeToChoice(filteredChannels)}
              displayValues={channelsDisplayValues}
              fetchChoices={onQueryChange}
              hasMore={false}
              label={intl.formatMessage({
                defaultMessage: "Channels permissions",
                id: "vz3yxp",
              })}
              loading={false}
              name="channels"
              onChange={onChannelChange}
              placeholder={"Test"}
              value={selectedChannels}
              testId="channels"
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};