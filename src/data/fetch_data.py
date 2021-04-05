import xlrd
import os
import database

def download(path):
    os.system(f'wget -O {path} https://www.collectivites-locales.gouv.fr/files/files/statistiques/taux_2019_com.xlsx &> /dev/null')

def dic_from(path):
  worksheet = xlrd.open_workbook(path, on_demand = True).sheet_by_index(0)
  first_row = []
  data = {}
  (columns_i, columns_j) = (0, 0)
  (idata, jdata) = (0, 0)
  for row in range(worksheet.nrows):
    for col in range(worksheet.ncols):
      if worksheet.cell_value(row,col) == 'Code commune':
        (columns_i, columns_j) = (row, col)
        for i in range(columns_i, worksheet.nrows):
          if type(worksheet.cell_value(i, col)) != str:
            (idata, jdata) = (i, col)
            break
        break
    if (columns_i, columns_j) != (0, 0):
      break
  for col in range(jdata, worksheet.ncols - 1):
    data[worksheet.cell_value(columns_i, col)] = []
    for row in range(idata, worksheet.nrows - 2):
      data[worksheet.cell_value(columns_i,col)].append(worksheet.cell_value(row,col))
  return data

pat = 'communal_2019.xlsx'
dpath = '../assets/db.sqlite3'
""" download(pat) """
dt = dic_from(pat)
dt = database.DatasetUtils.preprocess(dt)
db = database.Database(dpath)
tb = database.Table(db.db, 'commune', database.DatasetUtils.generate_attributes(dt))
for i in range(len(dt[list(dt.keys())[0]]['values'])):
  values = []
  for key in dt.keys():
    values.append(dt[key]['values'][i])
  tb.insert(values)
db.close()
