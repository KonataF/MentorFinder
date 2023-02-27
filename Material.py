class Material:
    def __init__(self, id, materialName, fileType, file, userHostId) -> None:
        self.id = id
        self.materialName = materialName
        self.fileType = fileType
        self.file = file
        self.userHostId = userHostId
