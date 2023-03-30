import { Box, Expression } from "@saleor/macaw-ui/next";
import React from "react";

import { FilterKind, Value } from "../State/types";
import { useFilterContext } from "./../State/context";

interface FilterKindProps {
  filterKind: FilterKind;
  choices: Value[];
  loading?: boolean;
}

export const FilterKindSelecor = ({
  filterKind,
  choices,
  loading,
}: FilterKindProps) => {
  const context = useFilterContext();

  const handleFilterKindChange = (newKind: Value) => {
    context.changeFilterKind(filterKind, newKind);
  };

  return (
    <Expression.OperandDropdown triggerText={filterKind.selected.displayName}>
      {choices.map(item => (
        <Expression.OperantDropdownItem
          key={item.id}
          onClick={() => handleFilterKindChange(item)}
        >
          {item.displayName}
        </Expression.OperantDropdownItem>
      ))}
      {loading && <Box>loading...</Box>}
    </Expression.OperandDropdown>
  );
};