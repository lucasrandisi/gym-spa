import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/material/SvgIcon/SvgIcon";
import React, { useEffect, useState } from "react";
import { useSnackbar, VariantType } from "notistack";

type Notification = {
	message: string;
	type: VariantType;
};

const useNotification = () => {
	const [conf, setConf] = useState<Notification>();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		if (conf?.message) {
			if (conf.type) {
				conf.type = "info";
			}
			enqueueSnackbar(conf.message, {
				variant: conf.type,
				autoHideDuration: 5000,
				action: (key: any) => (
					<IconButton
						onClick={() => {
							closeSnackbar(key);
						}}>
						<CloseIcon />
					</IconButton>
				),
			});
		}
	}, [closeSnackbar, conf, enqueueSnackbar]);

	return [conf, setConf];
};

export default useNotification;
