// scripts/generate-public-types.ts
import {Project} from 'ts-morph';

const prismaTypesPath = './node_modules/.prisma/client/index.d.ts'; // путь к сгенерённым типам
const outputPath = './types/public.ts'; // куда писать результат
const modelsToExport = ['Product', 'User', 'Brand', 'Category']; // какие типы экспортировать

const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
});

const source = project.addSourceFileAtPath(prismaTypesPath);
const typesFile = project.createSourceFile(outputPath, '', { overwrite: true });

typesFile.addStatements([
    `// ⚠️ Сгенерировано автоматически из Prisma моделей — не редактируй вручную`,
    `// eslint-disable`,
    ``,
]);

modelsToExport.forEach((modelName) => {
    const declaration = source.getInterface(modelName);
    if (!declaration) return;

    const props = declaration.getProperties();

    typesFile.addStatements([
        `export type Public${modelName} = {`,
        ...props.map((prop) => {
            const name = prop.getName();
            const typeNode = prop.getTypeNode();
            return `  ${name}: ${typeNode ? typeNode.getText() : 'any'};`;
        }),
        `};`,
        ``,
    ]);
});

project.saveSync();
console.log(`✅ Public types saved to ${outputPath}`);