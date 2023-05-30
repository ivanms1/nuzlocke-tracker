import React from "react";

import AlertDialog from "@/components/AlertDialog";

import { useDeleteEncounterMutation } from "generated";

interface DeleteEncounterDialogProps {
  open: boolean;
  onClose: () => void;
  encounterId: string;
}

function DeleteEncounterDialog({
  open,
  onClose,
  encounterId,
}: DeleteEncounterDialogProps) {
  const [deleteEncounter] = useDeleteEncounterMutation({
    variables: {
      deleteEncounterId: encounterId,
    },
    update(cache) {
      cache.evict({ id: `Encounter:${encounterId}` });
    },
  });

  const onDelete = async () => {
    try {
      await deleteEncounter();
      onClose();
    } catch (e) {
      onClose();
    }
  };

  return (
    <AlertDialog
      destructive
      open={open}
      onClose={onClose}
      onConfirm={onDelete}
      title="Are you sure you want to delete this encounter?"
    />
  );
}

export default DeleteEncounterDialog;
