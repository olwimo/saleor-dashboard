import { Rule } from "@dashboard/discounts/models";
import { ChannelFragment } from "@dashboard/graphql";
import { CommonError } from "@dashboard/utils/errors/common";
import {
  Box,
  Button,
  EditIcon,
  Text,
  TrashBinIcon,
} from "@saleor/macaw-ui-next";
import React from "react";
import { useIntl } from "react-intl";

import { messages } from "../../messages";
import { getCurencySymbol } from "../../utils";
import { Placeholder } from "../Placeholder";
import { RuleSummary } from "../RuleForm/components/RuleSummary";
import { RuleWrapper } from "../RuleForm/components/RuleWrapper";

interface RulesListProps<ErrorCode> {
  rules: Rule[];
  disabled?: boolean;
  channels: ChannelFragment[];
  errors: Array<CommonError<ErrorCode> & { index?: number }>;
  loading?: boolean;
  onRuleDelete: (index: number) => void;
  onRuleEdit: (index: number) => void;
}

export const RulesList = <ErrorCode,>({
  rules,
  errors,
  onRuleEdit,
  onRuleDelete,
  channels,
  disabled,
  loading,
}: RulesListProps<ErrorCode>) => {
  const intl = useIntl();
  if (rules.length === 0) {
    return <Placeholder />;
  }

  const getRuleName = (name: string | undefined) => {
    if (name) {
      return `: ${name}`;
    }
    return "";
  };

  return (
    <Box
      display="grid"
      __gridTemplateColumns="repeat(auto-fill, minmax(600px, 1fr))"
      gap={6}
    >
      {rules.map((rule, index) => {
        const hasError = errors.some(error => error.index === index);

        return (
          <RuleWrapper key={rule.id || index} hasError={hasError}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {intl.formatMessage(messages.catalogRule) +
                  getRuleName(rule.name)}

                <Box display="flex">
                  <Button
                    size="small"
                    variant="tertiary"
                    onClick={() => onRuleEdit(index)}
                    cursor={disabled ? "not-allowed" : "pointer"}
                    disabled={disabled}
                    data-test-id="rule-edit-button"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    disabled={disabled}
                    variant="tertiary"
                    data-test-id="rule-delete-button"
                    onClick={e => {
                      e.stopPropagation();
                      onRuleDelete(index);
                    }}
                  >
                    <TrashBinIcon />
                  </Button>
                </Box>
              </Box>
              <RuleSummary
                rule={rule}
                currencySymbol={getCurencySymbol(rule.channel, channels)}
                loading={loading}
              />
              {hasError && (
                <Text color="critical1">
                  {intl.formatMessage(messages.ruleError)}
                </Text>
              )}
            </Box>
          </RuleWrapper>
        );
      })}
    </Box>
  );
};
