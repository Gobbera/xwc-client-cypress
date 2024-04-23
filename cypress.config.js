module.exports = {
  env: {
    'URL': 'https://xgentest6-desenv.xgen.com.br/xgen_desenv6/clientv2/clientcytest',
    'URL_DLL': 'https://xgentest6-desenv.xgen.com.br/xgen_desenv6/xgen_desenv6.dll',
    'username': 'bsource3',
    'password': '!@#Bsource123', 
    'baseFieldTest': 'Teste',
    'email': 'leonardo.gobbo@bsource.com.br',
    'search': '%5B%7B%22property%22%3A%22dateStart%22%2C%22value%22%3A%222024-04-16T03%3A00%3A00.000Z%22%7D%2C%7B%22property%22%3A%22dateEnd%22%2C%22value%22%3A%222024-04-23T03%3A00%3A00.000Z%22%7D%2C%7B%22property%22%3A%22orderBy%22%2C%22value%22%3A%22DESC%22%7D%5D&source=SEARCH&dir=DESC&order=started&json=1&page=1&limit=25&offset=0',
    'search-email-in-queue': '%5B%7B%22property%22%3A%22inQueued%22%2C%22value%22%3A1%7D%2C%7B%22property%22%3A%22mediaStyle%22%2C%22value%22%3A16%7D%5D&source=QUEUEOFFLINE&dir=DESC&order=started&json=1&page=1&limit=25&offset=0' ,
    'backlog': '%5B%7B%22property%22%3A%22isSaved%22%2C%22value%22%3A1%7D%2C%7B%22property%22%3A%22agentId%22%2C%22value%22%3A1887%7D%5D&source=BACKLOG&dir=DESC&order=started&json=1&page=1&limit=25&offset=0' 
  },
  e2e: {
    baseUrl: 'https://xgentest6-desenv.xgen.com.br/xgen_desenv6/clientv2/clientcytest',
  },
};
