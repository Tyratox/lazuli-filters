exports.defineTags = dictionary => {
	dictionary.defineTag("filterable", {
		canHaveType: true,
		canHaveName: true,
		isNamespace: false,
		mustHaveValue: true,
		onTagged: (doclet, tag) => {
			doclet.scope = "instance";

			if (!doclet.filterable) {
				doclet.filterable = [];
			}

			doclet.filterable.push({
				name: tag.value.name,
				type: tag.value.type
					? tag.value.type.names.length === 1
						? tag.value.type.names[0]
						: tag.value.type.names
					: "",
				description: tag.value.description || ""
			});
		}
	});
};

exports.handlers = {
	newDoclet: e => {
		const { doclet: { filterable, description } } = e;

		if (filterable) {
			e.doclet.description = `
				${description}
				<br>
				<h3 class='subsection-title'>Filterable</h3>
				<table>
					<thead>
						<tr><th>Name</th><th>Type</th><th>Description</th></tr>
					</thead>
					<tbody>
						${filterable
							.map(({ name, type, description }) => {
								return `<tr><td>${name}</td><td>${type}</td><td>${description}</td></tr>`;
							})
							.join("")}
					</tbody>
				</table>`;
		}
	}
};
