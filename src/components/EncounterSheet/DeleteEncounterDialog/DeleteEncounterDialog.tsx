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
  const [deleteEncounter, { loading }] = useDeleteEncounterMutation({
    variables: {
      deleteEncounterId: encounterId,
    },
  });

  const onDelete = async () => {
    try {
      await deleteEncounter({
        update(cache) {
          cache.evict({ id: `Encounter:${encounterId}` });
        },
      });

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
      isLoading={loading}
      title="Are you sure you want to delete this encounter?"
    />
  );
}

export default DeleteEncounterDialog;
